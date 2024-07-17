import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const ProductModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 overflow-auto">
            <div className="bg-white p-6 rounded-lg relative max-w-md w-3/4">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <RxCross2 className="hover:scale-150 transition-transform duration-300 cursor-pointer" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ProductModal;
