// controllers/productController.js
const Product = require('../models/product.model.js');
const Subcategory = require('../models/subCategory.model.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { ErrorHandler } = require('../utils/error.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Category = require('../models/category.model.js');
const {
    verifyToken,
    authorizeAdmin,
} = require('../middleware/auth.middleware');
const Review = require('../models/reviews.model.js');
const mongoose = require('mongoose');

// Create a product
const createProduct = catchAsyncErrors(async (req, res, next) => {
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

    const price = parseFloat(req.body.price);
    const stock = parseFloat(req.body.stock);
    const cuttedPrice = parseFloat(req.body.cuttedPrice);
    const numOfReviews = parseFloat(req.body.numOfReviews);

    if (
        isNaN(price) ||
        isNaN(stock) ||
        isNaN(cuttedPrice) ||
        isNaN(numOfReviews)
    ) {
        return next(
            new ErrorHandler(
                400,
                'Price, stock, cuttedPrice, numOfReviews must be numeric'
            )
        );
    }

    const productData = {
        productName: req.body.productName,
        description: req.body.description,
        price: price,
        stock: stock,
        cuttedPrice: cuttedPrice,
        SubcategoryId: req.body.SubcategoryId,
        CategoryId: req.body.CategoryId,
        tags: req.body.tags || [],
        images: uploadedImages,
        numOfReviews: numOfReviews,
        sizes: req.body.sizes,
    };

    // Check if subcategoryId exists in the Subcategory table
    const subcategory = await Subcategory.findById(req.body.SubcategoryId);
    if (!subcategory) {
        return next(new ErrorHandler(404, 'Subcategory not found'));
    }
    const category = await Category.findById(req.body.CategoryId);
    if (!category) {
        return next(new ErrorHandler(404, 'Category not found'));
    }

    const product = await Product.create(productData);

    res.status(201).json(product);
});

// Show all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.json(products);
});

// Show product by ID
const getProductById = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    // Validate productId as ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return next(new ErrorHandler(400, 'Invalid product ID format'));
    }

    const product = await Product.findById(
        new mongoose.Types.ObjectId(productId)
    );

    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'));
    }
    res.json(product);
});

// Show products by tag
const getProductsByTag = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find({ tags: req.params.tag });
    if (!products || products.length === 0) {
        return next(new ErrorHandler(404, 'Product not found'));
    }
    res.json(products);
});

// Edit product
const editProduct = catchAsyncErrors(async (req, res, next) => {
    const {
        productName,
        description,
        price,
        stock,
        cuttedPrice,
        SubcategoryId,
        CategoryId,
        tags,
        numOfReviews,
        sizes,
    } = req.body;
    const productId = req.params.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'));
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

    // Replace image logic
    if (uploadedImages.length > 0) {
        // If there's an existing image, delete it from Cloudinary
        if (product.images && product.images.length > 0) {
            for (const image of product.images) {
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

    const updatedProductData = {
        productName,
        description,
        price: parseFloat(price),
        stock: parseFloat(stock),
        cuttedPrice: parseFloat(cuttedPrice),
        SubcategoryId,
        CategoryId,
        tags: tags || [],
        images: uploadedImages.length > 0 ? uploadedImages : product.images,
        numOfReviews: parseFloat(numOfReviews),
        sizes,
    };

    // Update product with new data
    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
    );

    // Check if subcategoryId exists in the Subcategory table
    const subcategory = await Subcategory.findById(SubcategoryId);
    if (!subcategory) {
        return next(new ErrorHandler(404, 'Subcategory not found'));
    }

    // Check if categoryId exists in the Category table
    const category = await Category.findById(CategoryId);
    if (!category) {
        return next(new ErrorHandler(404, 'Category not found'));
    }

    res.json(updatedProduct);
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler(404, 'Product not found'));
    }

    // Delete associated images from Cloudinary
    for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
    }

    // Delete associated reviews and their images
    const reviews = await Review.find({ product: productId });
    for (const review of reviews) {
        // Delete review images from Cloudinary
        for (const image of review.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        // Delete the review
        await Review.findByIdAndDelete(review._id);
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.json({
        message: 'Product and associated resources deleted successfully',
    });
});

module.exports = {
    createProduct: [verifyToken, authorizeAdmin, createProduct],
    editProduct: [verifyToken, authorizeAdmin, editProduct],
    deleteProduct: [verifyToken, authorizeAdmin, deleteProduct],
    getAllProducts,
    getProductById,
    getProductsByTag,
};
