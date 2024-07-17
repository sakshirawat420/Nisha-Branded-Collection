import React, { useState } from 'react';
import {
    useGetWishlistByUserQuery,
    useDeleteProductFromWishlistMutation,
    useDeleteWishlistByUserMutation,
} from '../api/wishlistApi';
import { useGetProductByIdQuery } from '../api/productApi';
import WishlistCard from '../components/WishlistCard';
import { useCreateOrUpdateCartMutation } from '../api/cartApi';
import { useNavigate } from 'react-router-dom';


const Wishlist = () => {
    const { data: wishlist, error, isLoading } = useGetWishlistByUserQuery();
    const [deleteProductFromWishlist] = useDeleteProductFromWishlistMutation();
    const [deleteWishlistByUser] = useDeleteWishlistByUserMutation();
    const [createOrUpdateCart] = useCreateOrUpdateCartMutation();
    const [addedToBag, setAddedToBag] = useState(false);
    const navigate = useNavigate();

    const handleRemove = async productId => {
        try {
            await deleteProductFromWishlist(productId);
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    };

    const handleDeleteWishlist = async () => {
        try {
            await deleteWishlistByUser();
        } catch (error) {
            console.error('Error deleting wishlist:', error);
        }
    };

    const handleMoveToBag = async productId => {
        try {
            const items = [{ product: productId, quantity: 1 }]; // Constructing the items array

            await createOrUpdateCart({ body: { items } });
            setAddedToBag(true);
            navigate('/cart');
            // Optionally, you can automatically remove the item from the wishlist after adding it to the bag
            await deleteProductFromWishlist(productId);
        } catch (error) {
            console.error('Error moving product to bag:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading wishlist</div>;

    return (
        <div className="p-10 flex flex-col gap-2 w-screen mt-[80px]">
            {addedToBag && (
                <div className="bg-green-200 text-green-800 p-2 mb-2">
                    Product added to bag!
                </div>
            )}
            <div className="flex gap-2 text-lg items-center">
                <div className="font-bold">My Wishlist</div>
                <div className="text-sm font-semibold">
                    ({wishlist.products.length} items)
                </div>
                <div
                    className="border-2 bg-red-50 px-2 cursor-pointer text-xs rounded"
                    onClick={handleDeleteWishlist}
                >
                    Delete Wishlist
                </div>
            </div>
            {wishlist.products.length === 0 ? (
                <h1>No items</h1>
            ) : (
                <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-5 grid-cols-2">
                    {wishlist.products.map(productId => (
                        <ProductFetcher
                            key={productId}
                            productId={productId}
                            onRemove={() => handleRemove(productId)}
                            onMoveToBag={() => handleMoveToBag(productId)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProductFetcher = ({ productId, onRemove, onMoveToBag }) => {
    const {
        data: product,
        error,
        isLoading,
    } = useGetProductByIdQuery(productId);
    if (isLoading) return <div>Loading product...</div>;
    if (error) return <div>Error loading product</div>;

    return (
        <WishlistCard
            product={product}
            onRemove={onRemove}
            onMoveToBag={onMoveToBag}
        />
    );
};

export default Wishlist;
