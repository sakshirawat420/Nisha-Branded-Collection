import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const SubCategoryModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2">
                    <RxCross2 className=" hover:scale-150 transition-transform duration-300 cursor-pointer" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default SubCategoryModal;
