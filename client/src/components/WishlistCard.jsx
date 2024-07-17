import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const WishlistCard = ({ product, onRemove, onMoveToBag }) => {
    const handleMoveToBag = () => {
        onMoveToBag(product._id);
    };

    return (
        <div className="flex flex-col gap-2 border-2 border-gray-200">
            <Link to={`/product/${product._id}`} className="relative">
                <img
                    src={product.images[0].secure_url}
                    alt="product"
                    className="w-full h-64 object-cover"
                />
                <RxCross2
                    className="absolute top-3 right-3 hover:scale-150 transition-transform duration-300 cursor-pointer"
                    onClick={onRemove}
                />
            </Link>
            <div className="flex flex-col justify-center items-start p-3">
                <div className="font-bold">{product.productName}</div>
                <div className="text-gray-500 text-xs">
                    {product.description}
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                    <div className="flex justify-center items-center gap-1">
                        <div className="font-semibold">
                            Rs. {product.cuttedPrice}
                        </div>
                        <div className="line-through text-gray-500 text-xs">
                            Rs. {product.price}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="text-red-500 flex py-3 justify-center border-t-2 border-gray-200 cursor-pointer"
                onClick={handleMoveToBag}
            >
                Move to Bag
            </div>
        </div>
    );
};

export default WishlistCard;
