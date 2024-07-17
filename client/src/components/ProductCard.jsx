import React from 'react';
import { useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { IoIosStar } from 'react-icons/io';
const ProductCard = ({ product }) => {
    const [wishlist, setWishlist] = useState(false);
    return (
        <div className="flex flex-col  relative border-2 border-gray-200 gap-2 hover:drop-shadow-2xl hover:cursor-pointer">
            <div>
                <img src={product.img} alt="product" className="" />
            </div>
            <div className="flex items-center justify-between gap-20 z-30 absolute bottom-24  px-3">
                <div className="flex bg-slate-50 px-2 py-1 text-xs justify-center items-center gap-2 font-semibold ">
                    <div className="flex justify-center items-center gap-1 ">
                        <div>{product.rating}</div>
                        <IoIosStar className="" />
                    </div>
                    {/* <PiLineVerticalBold /> */}
                    <div>{product.comment}</div>
                </div>
                <div onClick={() => setWishlist(!wishlist)}>
                    {wishlist ? (
                        <IoHeartOutline className="text-rose-600" />
                    ) : (
                        <IoHeartSharp className="fill-rose-500" />
                    )}
                </div>
            </div>
            <div className="flex flex-col justify-start items-start z-20  ml-3 ">
                <div className="font-bold ">{product.name}</div>
                <div className="text-gray-500 text-xs ">
                    {product.description}
                </div>
                <div className="flex justify-center items-center gap-2 pb-3">
                    <div className="flex justify-center items-center gap-1">
                        <div className="font-semibold">Rs. {product.price}</div>
                        <div className="line-through text-gray-500 text-xs">
                            Rs. {product.cuttedPrice}
                        </div>
                    </div>

                    <div className="text-red-400 text-xs">
                        ({product.discount}% OFF)
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
