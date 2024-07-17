const express = require('express');
const router = express.Router();
const {
    createOrUpdateWishlist,
    editWishlist,
    deleteWishlistByUser,
    deleteProductFromWishlist,
    getWishlistByUser,
} = require('../controller/wishlist.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Create a new wishlist
router.post('/create', verifyToken, createOrUpdateWishlist);

// Edit an existing wishlist
router.put('/edit/:id', verifyToken, editWishlist);

router.get('/getByUser', verifyToken, getWishlistByUser);

// Delete entire wishlist by user ID from token
router.delete('/delete', verifyToken, deleteWishlistByUser);

// Delete specific product from wishlist by product ID
router.delete('/delete/:productId', verifyToken, deleteProductFromWishlist);

module.exports = router;
