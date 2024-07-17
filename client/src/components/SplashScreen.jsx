import React, { Component } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import LOGO from '../assets/N ltr.....png';

function SplashMessage() {
    return (
        <motion.div
            className="absolute inset-0 min-w-screen min-h-screen bg-black flex justify-center items-center font-extrabold text-lg text-black overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <PulseSyncFadeFast duration={1} delay={0.8} />
        </motion.div>
    );
}

export default function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true,
            };
        }

        async componentDidMount() {
            try {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                    });
                }, 1000);
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                });
            }
        }

        render() {
            if (this.state.loading) return SplashMessage();

            return <WrappedComponent {...this.props} />;
        }
    };
}

const PulseSyncFadeFast = ({
    n = 1,
    duration = 0.5,
    delay = 0,
    width = 200,
    gap = 50,
}) => {
    return (
        <motion.div
            style={{
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
            }}
        >
            {Array.from({ length: n }, (_, i) => {
                const pulseDelay = delay * i;
                const pulseRepeatDelay = pulseDelay;
                const pulseDuration = duration + delay * (n - i);
                return (
                    <React.Fragment key={uuidv4()}>
                        <motion.div
                            key={uuidv4()}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 0.5 }}
                            transition={{ delay: 0.5 }}
                            style={{
                                borderRadius: '50%',
                                background:
                                    'radial-gradient(50% 50% at 50% 50%, rgba(252, 252, 252, 0.3) 0%, #FCFCFC 100%) ',
                                border: '1px solid #287d51',
                                // #fcd0b7
                                opacity: 0.5,
                                gridArea: '1 / 1 / 2 / 2',
                                width: `${width + gap * i}px`,
                                aspectRatio: '1/1',
                                zIndex: n - i,
                            }}
                            {...(i !== 0 && {
                                initial: { opacity: 0 },
                                animate: { opacity: [0, 1, 0], scale: 1.1 },
                                transition: {
                                    duration: pulseDuration,
                                    delay: pulseDelay,
                                    ease: [0.05, 0.6, 0.3, 0.3],
                                    repeat: Infinity,
                                    repeatDelay: pulseRepeatDelay,
                                },
                            })}
                        />
                        <motion.div
                            className="absolute flex z-10"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 2.5 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src={LOGO}
                                alt="logo"
                                width={window.innerWidth < 500 ? 200 : 400}
                                className="object-contain "
                            />
                        </motion.div>
                    </React.Fragment>
                );
            })}
        </motion.div>
    );
};
