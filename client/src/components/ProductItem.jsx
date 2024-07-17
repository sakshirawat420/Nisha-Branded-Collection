import React, { useState, useEffect } from 'react';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaRupeeSign } from 'react-icons/fa';
import {
    MdOutlineKeyboardArrowRight,
    MdOutlineKeyboardArrowLeft,
} from 'react-icons/md';
import ImageMagnifier from './ImageMagnifier';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../api/productApi';

const ProductItem = () => {
    const { productId } = useParams();
    const {
        data: product,
        error,
        isLoading,
    } = useGetProductByIdQuery(productId);

    const [mainImage, setMainImage] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust this threshold based on your definition of mobile devices
        };

        handleResize(); // Check initially

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (product && product.images.length > 0) {
            setMainImage(product.images[0].secure_url);
        }
    }, [product]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading product</div>;

    const handleImageClick = image => {
        setMainImage(image);
    };

    const handleSlide = direction => {
        if (direction === 'left') {
            setStartIndex(prevIndex => Math.max(prevIndex - 1, 0));
        } else if (direction === 'right') {
            setStartIndex(prevIndex =>
                Math.min(prevIndex + 1, product.images.length - 3)
            );
        }
    };

    const remainingImages = product.images.length - (startIndex + 3);

    return (
        <div className="h-full mt-[90px]">
            <div className="flex flex-col md:flex-row justify-start items-start sm:gap-5 gap-1">
                <div className="flex flex-col justify-center items-center">
                    {isMobile ? (
                        <img
                            src={mainImage}
                            className="object-contain h-[400px] w-[300px] sm:w-[600px] sm:h-[700px] flex items-center transition-transform duration-300 transform hover:scale-105"
                            width={300}
                            height={400}
                            alt="Main Product"
                        />
                    ) : (
                        <ImageMagnifier
                            src={mainImage}
                            className="object-contain h-[400px] w-[300px] sm:w-[600px] sm:h-[700px] flex items-center hover:cursor-pointer"
                            width={300}
                            height={400}
                            alt="Main Product"
                        />
                    )}

                    <div className="flex justify-center items-center w-80 h-36 gap-2">
                        <div
                            onClick={() => handleSlide('left')}
                            className="hover:cursor-pointer"
                        >
                            <MdOutlineKeyboardArrowLeft size="15px" />
                        </div>
                        {product.images
                            .slice(startIndex, startIndex + 3)
                            .map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        handleImageClick(image.secure_url)
                                    }
                                >
                                    <img
                                        src={image.secure_url}
                                        alt={`Product ${index + 1}`}
                                        className="hover:border-black hover:border-2 hover:shadow-md hover:cursor-pointer md:w-20 md:h-28 w-15 h-20"
                                    />
                                </div>
                            ))}
                        {remainingImages > 0 && <div>+{remainingImages}</div>}
                        <div
                            onClick={() => handleSlide('right')}
                            className="hover:cursor-pointer"
                        >
                            <MdOutlineKeyboardArrowRight size="15px" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start gap-3 py-5 sm:py-1 sm:mt-4">
                    <div className="font-bold text-2xl">
                        {product.productName}
                    </div>
                    <div className="text-lg text-gray-500">
                        {product.description}
                    </div>
                    <div className="flex border-2 border-gray-300 p-1 gap-1">
                        <div className="flex items-center gap-1">
                            <div className="font-bold text-xs">4.1</div>
                            <MdOutlineStarPurple500 className="fill-emerald-600" />
                        </div>
                        <div className="border-l border-gray-200 w-0"></div>
                        <div className="text-xs">24.1k Ratings</div>
                    </div>
                    <div className="h-0 border-t border-gray-200"></div>
                    <div className="flex gap-2 items-center">
                        <div className="flex items-center">
                            <FaRupeeSign />
                            <div className="font-bold text-xl">
                                {product.cuttedPrice}
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                            <div>MRP</div>
                            <div className="flex items-center line-through">
                                <FaRupeeSign />
                                <div>{product.price}</div>
                            </div>
                        </div>
                        <div className="text-orange-400 font-semibold">
                            (76% OFF)
                        </div>
                    </div>
                    <div className="font-bold text-emerald-600 text-sm">
                        inclusive all taxes
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="font-bold text-sm">SELECT SIZE</div>
                        <div className="flex items-center text-rose-400 font-bold text-xs">
                            <div>SIZE CHART</div>
                            <MdOutlineKeyboardArrowRight size="15px" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {product.sizes.map((size, index) => (
                            <div
                                key={index}
                                className="rounded-full border-2 border-gray-300 hover:border-rose-400 cursor-pointer aspect-square flex justify-center items-center w-[50px]"
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                        <div className="flex items-center justify-center gap-2 text-white font-semibold bg-rose-400 px-4 rounded py-2">
                            <RiShoppingCart2Fill />
                            <div> ADD TO BAG</div>
                        </div>
                        <div className="flex gap-2 items-center px-4 justify-center font-semibold rounded py-2 border-2 border-gray-300">
                            <IoIosHeartEmpty />
                            <div className="text-sm">WISHLIST</div>
                        </div>
                    </div>
                    <div className="h-0 border-t border-gray-200"></div>
                    <div className="font-semibold">PRODUCT DETAILS</div>
                    <div className="text-gray-500">{product.description}</div>
                    <div className="h-0 border-t border-gray-200"></div>
                    <div className="flex gap-2">
                        <div>RATINGS</div>
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="font-light text-5xl font-mono">4.1</div>
                        <MdOutlineStarPurple500 size="40px" />
                    </div>
                    <div className="h-0 border-t border-gray-200"></div>
                    <div className="font-semibold">Customer Reviews (189)</div>
                    <div className="w-screen flex flex-col justify-start items-start gap-2 p-2">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex gap-4 justify-start items-start">
                                <div className="flex items-center justify-center bg-teal-600 text-white text-xs px-1">
                                    <div>4</div>
                                    <MdOutlineStarPurple500 className="fill-white" />
                                </div>
                                <div className="text-sm">
                                    Everything was Good . Colour v Achha h . Bt
                                    Mujhe print pattern pasand nhi aaya .
                                    Fitting achhi thi bash back side se tight
                                    tha.
                                </div>
                            </div>
                            <div className="flex gap-2 w-12">
                                {/* <img src={productImg1} alt="Review" />
                                <img src={productImg1} alt="Review" /> */}
                            </div>
                            <div className="flex gap-2 text-xs">
                                <div>Sakshi Rawat</div>
                                <div className="border-l border-gray-200 w-0"></div>
                                <div>7 Nov 2023</div>
                            </div>
                            <div className="h-0 border-t border-gray-200"></div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 justify-start items-start">
                                <div className="flex items-center justify-center bg-teal-600 text-white text-xs px-1">
                                    <div>4</div>
                                    <MdOutlineStarPurple500 className="fill-white" />
                                </div>
                                <div className="text-sm">
                                    Everything was Good . Colour v Achha h . Bt
                                    Mujhe print pattern pasand nhi aaya .
                                    Fitting achhi thi bash back side se tight
                                    tha.
                                </div>
                            </div>
                            <div className="flex gap-2 w-12">
                                {/* <img src={productImg1} alt="Review" />
                                <img src={productImg1} alt="Review" /> */}
                            </div>
                            <div className="flex gap-2 text-xs">
                                <div>Sakshi Rawat</div>
                                <div className="border-l border-gray-200 w-0"></div>
                                <div>7 Nov 2023</div>
                            </div>
                            <div className="h-0 border-t border-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
