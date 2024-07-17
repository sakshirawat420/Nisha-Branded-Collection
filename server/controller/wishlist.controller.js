const Wishlist = require('../models/wishlist.model');
const { ErrorHandler } = require('../utils/error.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { User } = require('../models/user.model.js');

const createOrUpdateWishlist = async (req, res, next) => {
    try {
        const { product_id } = req.body;
        const customer_id = req.userId;

        // Check if a wishlist already exists for the customer
        let wishlist = await Wishlist.findOne({ customer_id });

        if (!wishlist) {
            // If no wishlist exists, create a new one
            wishlist = await Wishlist.create({
                products: [product_id],
                customer_id,
            });
        } else {
            if (!wishlist.products.includes(product_id)) {
                wishlist.products.push(product_id);
                await wishlist.save();
            }
        }

        res.status(201).json(wishlist);
    } catch (error) {
        next(error);
    }
};

// Edit an existing wishlist
const editWishlist = catchAsyncErrors(async (req, res, next) => {
    const wishlistId = req.params.id;
    const { products, customer_id } = req.body;

    // Check if the customer exists
    const user = await User.findById(customer_id);
    if (!user) {
        throw new ErrorHandler(400, 'Customer ID does not exist');
    }

    // Update the wishlist
    const wishlist = await Wishlist.findByIdAndUpdate(
        wishlistId,
        { products, customer_id },
        { new: true }
    );
    if (!wishlist) {
        throw new ErrorHandler(404, 'Wishlist not found');
    }
    res.json(wishlist);
});

const getWishlistByUser = catchAsyncErrors(async (req, res, next) => {
    const customer_id = req.userId;

    const wishlist = await Wishlist.findOne({ customer_id });

    if (!wishlist) {
        return res.status(200).json({ products: [] });
    }

    res.status(200).json(wishlist);
});

// Function to delete the entire wishlist based on user ID from token
const deleteWishlistByUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.userId; // Assuming user ID is stored in req.user.id

    // Check if the wishlist exists
    const wishlist = await Wishlist.findOneAndDelete({ user: userId });
    if (!wishlist) {
        return next(new ErrorHandler(404, 'Wishlist not found'));
    }

    res.status(204).json();
});

// Function to delete a specific product from the user's wishlist
const deleteProductFromWishlist = catchAsyncErrors(async (req, res, next) => {
    const userId = req.userId; // Assuming user ID is stored in req.user.id
    const { productId } = req.params;

    // Check if the wishlist exists
    const wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
        return next(new ErrorHandler(404, 'Wishlist not found'));
    }

    // Find the product in the wishlist and remove it
    const productIndex = wishlist.products.findIndex(
        product => product.toString() === productId
    );
    if (productIndex === -1) {
        return next(new ErrorHandler(404, 'Product not found in wishlist'));
    }

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.status(204).json();
});

module.exports = {
    createOrUpdateWishlist,
    editWishlist,
    deleteWishlistByUser,
    deleteProductFromWishlist,
    getWishlistByUser,
};
