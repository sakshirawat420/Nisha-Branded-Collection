const Review = require('../models/reviews.model.js');
const Product = require('../models/product.model.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { ErrorHandler } = require('../utils/error.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { User } = require('../models/user.model.js');

// Add a review
const addReview = catchAsyncErrors(async (req, res, next) => {
    // Upload images
    const uploadedImages = [];
    for (const file of req.files) {
        const uploadedImage = await cloudinary.uploader.upload(file.path);
        uploadedImages.push({
            public_id: uploadedImage.public_id,
            secure_url: uploadedImage.secure_url,
        });
        // Delete the uploaded file from local storage
        fs.unlinkSync(file.path);
    }

    // Validate user and product IDs
    const userId = req.body.user;
    const productId = req.body.product;
    const rating = parseFloat(req.body.rating);

    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler(404, 'User not found'));
    }

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'));
    }

    const reviewData = {
        user: userId,
        product: productId,
        rating: rating,
        comment: req.body.comment,
        images: uploadedImages,
    };

    const review = await Review.create(reviewData);
    res.status(201).json(review);
});

// Delete a review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        return next(new ErrorHandler(404, 'Review not found'));
    }
    // Delete associated images from Cloudinary
    for (const image of review.images) {
        try {
            await cloudinary.uploader.destroy(image.public_id);
            console.log(`Deleted image with public_id: ${image.public_id}`);
        } catch (error) {
            console.error(
                `Error deleting image with public_id: ${image.public_id}`,
                error
            );
        }
    }
    res.json({ message: 'Review deleted successfully' });
});

// Get a review by ID
const getReviewById = catchAsyncErrors(async (req, res, next) => {
    const reviewId = req.params.id;
    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new ErrorHandler(404, 'Review not found'));
    }
    res.json(review);
});

// Get all reviews
const getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const reviews = await Review.find();
    res.json(reviews);
});

const editReview = catchAsyncErrors(async (req, res, next) => {
    const reviewId = req.params.id;

    // Check if review exists
    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new ErrorHandler(404, 'Review not found'));
    }

    // Upload images
    const uploadedImages = [];
    for (const file of req.files) {
        const uploadedImage = await cloudinary.uploader.upload(file.path);
        uploadedImages.push({
            public_id: uploadedImage.public_id,
            secure_url: uploadedImage.secure_url,
        });
        // Delete the uploaded file from local storage
        fs.unlinkSync(file.path);
    }

    // Replace image logic for review images
    if (uploadedImages.length > 0) {
        // If there are existing images, delete them from Cloudinary
        if (review.images && review.images.length > 0) {
            for (const image of review.images) {
                const deletionResult = await cloudinary.uploader.destroy(
                    image.public_id
                );
                if (deletionResult.result === 'ok') {
                    console.log('Previous image deleted:', deletionResult);
                } else {
                    console.error(
                        'Error deleting previous image:',
                        deletionResult
                    );
                }
            }
        }
    }

    const { rating, comment } = req.body;

    const updatedReviewData = {
        rating,
        comment,
        images: uploadedImages.length > 0 ? uploadedImages : review.images,
    };

    // Update review with new data
    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        updatedReviewData,
        { new: true }
    );

    res.json(updatedReview);
});

module.exports = {
    addReview,
    deleteReview,
    getReviewById,
    getAllReviews,
    editReview,
};
