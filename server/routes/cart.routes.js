const express = require('express');
const router = express.Router();
const {
    createOrUpdateCart,
    editCart,
    getAllCarts,
    deleteCart,
    deleteProductFromCart,
    getCartsByUser,
} = require('../controller/cart.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const validateCart = require('../middleware/validate.middleware');
const cartSchema = require('../validator/cart.validator');

// Create or update a cart
router.post('/create', verifyToken, createOrUpdateCart);

// Edit an existing cart
router.put('/edit/:itemId', verifyToken, editCart);

// Get all carts
router.get('/getAll', verifyToken, getAllCarts);

router.get('/delete', verifyToken, deleteCart);
router.delete('/delete/:itemId', verifyToken, deleteProductFromCart);
router.get('/getCartByUser', verifyToken, getCartsByUser);

module.exports = router;
