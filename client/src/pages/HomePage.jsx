import React, { useState, useEffect } from 'react';
import Herosection from '../components/Herosection';
import img2 from '../assets/8131928.jpg';
import withSplashScreen from '../components/SplashScreen';

function HomePage() {
    const [saleEndsIn, setSaleEndsIn] = useState('');

    useEffect(() => {
        // Calculate sale end time (e.g., 3 days from now)
        const endTime = new Date();
        endTime.setDate(endTime.getDate() + 3); // Adjust the number of days as needed

        // Update saleEndsIn every second
        const timer = setInterval(() => {
            const now = new Date();
            const timeDiff = endTime - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                // Format the time remaining
                setSaleEndsIn(
                    <span>
                        <span className="text-xl  font-semibold">{days}</span>{' '}
                        Days :{' '}
                        <span className="text-xl  font-semibold">{hours}</span>{' '}
                        H :{' '}
                        <span className="text-xl  font-semibold">
                            {minutes}
                        </span>{' '}
                        M :{' '}
                        <span className="text-xl  font-semibold">
                            {seconds}
                        </span>{' '}
                        S
                    </span>
                );
            } else {
                // Sale has ended
                setSaleEndsIn('Sale Ended');
                clearInterval(timer);
            }
        }, 1000);

        // Cleanup function to clear the interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div className=" flex flex-col gap-2 w-full h-full">
                <div className="text-black text-xl p-4 text-center bg-blue-50 mt-2">
                    Sale Ends In :{' '}
                    <span className="text-sm ">{saleEndsIn}</span>
                </div>
                <img src={img2} className="w-screen h-72 " alt="Image 1" />
                <Herosection />
            </div>
        </>
    );
}

export default withSplashScreen(HomePage);
