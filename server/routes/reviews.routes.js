const express = require('express');
const router = express.Router();
const reviewSchema = require('../validator/reviews.validator');
const validateReview = require('../middleware/validate.middleware');
const { upload } = require('../middleware/multer.middleware');
const {
    addReview,
    deleteReview,
    getAllReviews,
    getReviewById,
    editReview,
} = require('../controller/reviews.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Create a product
router
    .route('/create')
    .post(
        verifyToken,
        upload.array('images', 2),
        validateReview(reviewSchema),
        addReview
    );

// Get all products
router.get('/getAll', verifyToken, getAllReviews);

// Get product by ID
router.get('/get/:id', verifyToken, getReviewById);

// Edit product
router.put(
    '/edit/:id',
    verifyToken,
    upload.array('images', 2),
    validateReview(reviewSchema),
    editReview
);

// Delete product
router.delete('/delete/:id', verifyToken, deleteReview);

module.exports = router;
