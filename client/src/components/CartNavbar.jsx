import logo from '../assets/Heading.png';
import safe from '../assets/vecteezy_credit-card-payment-safe-secure-icon_10177796-1.jpg';

const CartNavbar = () => {
    return (
        <div className=" h-20 flex gap-3 justify-between items-center bg-white shadow-lg w-screen px-2 fixed top-0 z-30">
            {/* Logo */}
            <img src={logo} alt="Logo" className="p-2 h-full  " />
            <div className="h-full md:flex items-center justify-center hidden ">
                BAG ------- ADDRESS ------ PAYMENT
            </div>
            <div className="h-full flex justify-center items-center text-lg font-semibold font-mono">
                <img src={safe} alt="safe" className=" h-1/2 md:h-full" />
                <div className="md:text-2xl text-xs">100% Secure</div>
            </div>
        </div>
    );
};

export default CartNavbar;
