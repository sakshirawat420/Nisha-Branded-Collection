const SubCategory = require('../models/subCategory.model.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const Category = require('../models/category.model.js');
const { ErrorHandler } = require('../utils/error.js');
const Product = require('../models/product.model.js');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const {
    verifyToken,
    authorizeAdmin,
} = require('../middleware/auth.middleware');

// Create a new subcategory
const createSubcategory = catchAsyncErrors(async (req, res, next) => {
    // Upload the image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    // Delete the uploaded file from local storage
    fs.unlinkSync(req.file.path);

    // Check if the category exists
    const category = await Category.findById(req.body.CategoryId);
    if (!category) {
        return next(new ErrorHandler(404, 'Category not found'));
    }

    // Create the subcategory with the uploaded image details
    const subcategoryData = {
        CategoryId: req.body.CategoryId,
        SubCategoryName: req.body.SubCategoryName,
        SubCategoryImage: {
            public_id: uploadedImage.public_id,
            secure_url: uploadedImage.secure_url,
        },
    };

    const subcategory = await SubCategory.create(subcategoryData);

    res.status(201).json(subcategory);
});

// Get all subcategories
const getAllSubcategories = catchAsyncErrors(async (req, res, next) => {
    const subcategories = await SubCategory.find();
    res.json(subcategories);
});

// Get a single subcategory by ID
const getSubcategoryById = catchAsyncErrors(async (req, res, next) => {
    const subId = req.params.id;
    const subcategory = await SubCategory.findById({ _id: subId });
    if (!subcategory) {
        return next(new ErrorHandler(404, 'Subcategory not found'));
    }
    res.json(subcategory);
});

// Update a subcategory by ID
const updateSubcategoryById = catchAsyncErrors(async (req, res, next) => {
    // Find the subcategory by id
    const subcategory = await SubCategory.findById(req.params.id);

    // If subcategory not found, return an error
    if (!subcategory) {
        return next(new ErrorHandler(404, 'Subcategory not found'));
    }

    // If there's an existing image, delete it from Cloudinary
    if (
        subcategory.SubCategoryImage &&
        subcategory.SubCategoryImage.public_id
    ) {
        const deletionResult = await cloudinary.uploader.destroy(
            subcategory.SubCategoryImage.public_id
        );
        if (deletionResult.result === 'ok') {
            console.log('Previous image deleted:', deletionResult);
        } else {
            console.error('Error deleting previous image:', deletionResult);
        }
    }

    // Upload the new image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    // Delete the uploaded file from local storage
    fs.unlinkSync(req.file.path);

    // Update subcategory with new data
    subcategory.SubCategoryName = req.body.SubCategoryName;
    subcategory.SubCategoryImage = {
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
    };

    // Save the updated subcategory
    await subcategory.save();

    res.json(subcategory);
});

// Delete a subcategory by ID
const deleteSubcategoryById = async (req, res, next) => {
    try {
        const subcategoryId = req.params.id;

        // Find and delete the subcategory
        const subcategory = await SubCategory.findByIdAndDelete(subcategoryId);
        if (!subcategory) {
            return next(new ErrorHandler(404, 'Subcategory not found'));
        }
        await cloudinary.uploader.destroy(
            subcategory.SubCategoryImage.public_id
        );

        // Delete images associated with products of the deleted subcategory from Cloudinary
        const products = await Product.find({ SubcategoryId: subcategoryId });
        for (const product of products) {
            if (product.images && product.images.length > 0) {
                for (const image of product.images) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }
        }

        // Find and delete products associated with the deleted subcategory
        await Product.deleteMany({ SubcategoryId: subcategoryId });

        res.json({
            message: 'Subcategory and associated products deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSubcategory: [verifyToken, authorizeAdmin, createSubcategory],
    updateSubcategoryById: [verifyToken, authorizeAdmin, updateSubcategoryById],
    deleteSubcategoryById: [verifyToken, authorizeAdmin, deleteSubcategoryById],
    getAllSubcategories,
    getSubcategoryById,
};
