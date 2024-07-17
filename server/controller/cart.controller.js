const Cart = require('../models/cart.model');
const { ErrorHandler } = require('../utils/error.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { User } = require('../models/user.model.js');
const mongoose = require('mongoose');

const createOrUpdateCart = catchAsyncErrors(async (req, res, next) => {
    const { items } = req.body;
    const customer_id = req.userId;

    console.log(req.body);
    console.log(req.userId);

    // Validate that items and customer_id are present
    if (!items || items.length === 0 || !customer_id) {
        return res.status(400).json({
            success: false,
            message: 'Items and customer_id are required',
        });
    }

    // Check if a cart already exists for the customer
    let cart = await Cart.findOne({ customer_id });

    if (!cart) {
        // If no cart exists, create a new one
        cart = new Cart({
            items: items.map(item => ({
                product: item.product, // Assuming item.product is already an ObjectId
                quantity: item.quantity,
            })),
            customer_id,
        });
    } else {
        // If cart exists, update the items
        items.forEach(({ product, quantity }) => {
            const existingItem = cart.items.find(item =>
                item.product.equals(product)
            );
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product, quantity });
            }
        });
    }
    console.log(cart);
    await cart.save();

    res.status(201).json({
        success: true,
        cart,
    });
});

// Edit an existing cart
const editCart = catchAsyncErrors(async (req, res, next) => {
    const itemId = req.params.itemId; // Extract item_id from the request parameters
    const customerId = req.userId; // Extract customer_id from the token (assuming req.user is populated by authentication middleware)
    const { quantity } = req.body; // Extract the new quantity from the request body
    console.log(req.body);
    // Find the cart for the customer
    const cart = await Cart.findOne({ customer_id: customerId });
    if (!cart) {
        throw new ErrorHandler(404, 'Cart not found');
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
        item => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
        throw new ErrorHandler(404, 'Item not found in cart');
    }

    // Update the item quantity
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.json(cart);
});

const getAllCarts = catchAsyncErrors(async (req, res, next) => {
    const carts = await Cart.find();
    res.json(carts);
});

const getCartsByUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.userId;

    // Find all carts belonging to the user
    const carts = await Cart.find({ customer_id: userId });

    if (!carts) {
        // If no carts are found, return an empty array
        return res.status(200).json([]);
    }

    const items = carts.map(cart => cart.items).flat();

    res.status(200).json(items);
});

const deleteProductFromCart = catchAsyncErrors(async (req, res, next) => {
    const { itemId } = req.params;

    try {
        // Find the cart containing the item with the given itemId
        const cart = await Cart.findOne({ 'items._id': itemId });

        if (!cart) {
            // If cart not found, return an error or handle it accordingly
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Filter out the item with the matching itemId
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        // Save the updated cart
        await cart.save();

        // Return the updated cart or any other response you need
        res.status(200).json(cart);
    } catch (error) {
        // Handle any errors
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Failed to delete product from cart' });
    }
});

// Delete the entire cart
const deleteCart = catchAsyncErrors(async (req, res, next) => {
    const customer_id  = req.userId;

    // Check if a cart exists for the customer
    const cart = await Cart.findOneAndDelete({ customer_id });
    if (!cart) {
        return next(new ErrorHandler(404, 'Cart not found'));
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
});
module.exports = {
    createOrUpdateCart,
    editCart,
    getAllCarts,
    deleteCart,
    deleteProductFromCart,
    getCartsByUser,
};
