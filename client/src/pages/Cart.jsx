import React, { useState } from 'react';
import {
    useDeleteProductFromCartMutation,
    useEditCartMutation,
    useGetCartsByUserQuery,
} from '../api/cartApi';
import { useGetProductByIdQuery } from '../api/productApi';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { CloudCog } from 'lucide-react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { useAddWishlistMutation } from '../api/wishlistApi';

const Cart = () => {
    const { data: carts, error, isLoading } = useGetCartsByUserQuery();
    const [deleteCartItem] = useDeleteProductFromCartMutation();
    const [editCart] = useEditCartMutation();
    const [wishlist, setWishlist] = useState(true);
    const toggleWishlist = () => {
        setWishlist(!wishlist);
    };

    const [addWishlist] = useAddWishlistMutation();

    const handleRemove = async id => {
        try {
            await deleteCartItem({ itemId: id });
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await editCart({ itemId, quantity: newQuantity });
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleClearCart = async () => {
        try {
            // Loop through each item in the cart and delete it
            carts.forEach(async item => {
                await deleteCartItem({ itemId: item._id });
            });
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading cart</div>;

    if (!carts || carts.length === 0) {
        return (
            <div className="flex justify-center items-center mt-[80px]">
                No items found in cart
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center mt-[80px] ">
            <div className="flex flex-col gap-4 border border-gray-200 p-2 md:flex-row">
                <div className="flex flex-col gap-2 ">
                    {carts.map(item => (
                        <CartItem
                            key={item.product}
                            item={item}
                            cart={carts}
                            onRemove={() => handleRemove(item._id)}
                            onQuantityChange={newQty =>
                                handleQuantityChange(item._id, newQty)
                            }
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                            addWishlist={addWishlist}
                        />
                    ))}
                    <div
                    className="border-2 bg-red-50 px-2 cursor-pointer text-xs rounded font-semibold text-center"
                    onClick={handleClearCart}
                >
                    Clear Cart
                </div>
                <OrderSummary carts={carts} />
                
                </div>
                
            </div>
        </div>
    );
};




const CartItem = ({
    item,
    cart,
    onRemove,
    onQuantityChange,
    wishlist,
    toggleWishlist,
    addWishlist,
}) => {
    const {
        data: product,
        error,
        isLoading,
    } = useGetProductByIdQuery(item.product);

    if (isLoading) return <div>Loading product...</div>;
    if (error) return <div>Error loading product</div>;

    const handleIncrease = () => {
        const newQuantity = Math.min(item.quantity + 1, 5); // Ensure quantity does not exceed 5
        onQuantityChange(newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = Math.max(item.quantity - 1, 1); // Ensure quantity does not go below 1
        onQuantityChange(newQuantity);
    };

    const handleWishlist = async () => {
        try {
            await addWishlist({ product_id: item.product });
            toggleWishlist();
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        }
    };

    let totalCuttedPrice = 0;
    for (const item of cart) {
        totalCuttedPrice += item.quantity * product.cuttedPrice;
    }

    console.log(totalCuttedPrice);

    let totalPrice = 0;
    for (const item of cart) {
        totalPrice += item.quantity * product.price;
    }

    console.log(totalPrice);

    return (
        <div className="flex justify-start items-start gap-2 border p-2 hover:border-rose-200 hover:border-2 hover:cursor-pointer relative ">
            <Link className="flex gap-2" to={`/product/${item.product}`}>
                <img
                    src={product.images[0].secure_url}
                    className="w-20"
                    alt={product.productName}
                />
                <RxCross2
                    onClick={onRemove}
                    className="absolute top-1 right-2 hover:scale-150 transition-transform duration-300 cursor-pointer"
                />
            </Link>
            <div className="flex flex-col mt-2">
                <Link className="font-bold" to={`/product/${item.product}`}>
                    {product.productName}
                </Link>
                <div className="text-gray-700 text-sm">
                    {product.description}
                </div>
                <div className="w-fit bg-gray-100 px-2 py-1 text-sm">
                    <button
                        onClick={handleDecrease}
                        className="px-2 bg-gray-200 hover:bg-gray-300"
                    >
                        -
                    </button>
                    <select
                        value={item.quantity}
                        onChange={e =>
                            onQuantityChange(parseInt(e.target.value))
                        }
                        className="w-12"
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleIncrease}
                        className="px-2 bg-gray-200 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
                <div className="flex items-center gap-2 text-sm  ">
                    <div className="flex font-bold">
                        <div>&#8377;</div>
                        <div>{product.cuttedPrice}</div>
                    </div>
                    <div className="line-through text-gray-500 text-xs">
                        Rs. {product.cuttedPrice}
                    </div>
                    <div onClick={handleWishlist} className="cursor-pointer">
                        {wishlist ? (
                            <IoHeartOutline className="text-rose-600" />
                        ) : (
                            <IoHeartSharp className="fill-rose-500" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderSummary = ({ carts }) => {
    const totalItems = carts.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="flex flex-col justify-start items-start p-2 gap-2">
            <div className="flex md:flex-row flex-col justify-center items-center gap-4 bg-rose-50 p-4">
                <div className="flex flex-col item-center justify-center">
                    <div className="flex gap-1">
                        <div className="text-slate-800">Deliver to:</div>
                        <span className="font-bold">Sakshi Rawat, 248002</span>
                    </div>
                    <div className="text-slate-800 text-sm">
                        Mausa General Store, Near Saint Mary, Gaurav Mess
                        Clement Town..
                    </div>
                </div>
                <div className="text-rose-500 border-2 border-rose-500 p-2 font-bold rounded">
                    CHANGE ADDRESS
                </div>
            </div>
            <div className="flex flex-col border border-gray-200 p-2 w-full">
                <div className="font-semibold text-sm">
                    PRICE DETAILS ({totalItems} Items)
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                    <div>Total MRP</div>
                    <div className="flex">
                        <div>&#8377;</div>
                        {/* <div>{totalCuttedPrice}</div> */}
                    </div>
                </div>
            </div>
            <div className="flex justify-between text-sm font-bold border border-gray-200 w-full p-2">
                <div>Total Amount</div>
                <div className="flex">
                    <div>&#8377;</div>
                    {/* <div>{totalAmount}</div> */}
                </div>
            </div>
            <div className="bg-rose-500 text-center w-full py-2 text-white font-bold">
                PLACE ORDER
            </div>
        </div>
    );
};

export default Cart;
