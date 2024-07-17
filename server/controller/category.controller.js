const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const Category = require('../models/category.model.js');
const { ErrorHandler } = require('../utils/error.js');
const SubCategory = require('../models/subCategory.model');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const {
    verifyToken,
    authorizeAdmin,
} = require('../middleware/auth.middleware');

//create new category
const createCategory = catchAsyncErrors(async (req, res, next) => {
    // Upload the image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload(req.file.path);

    // Delete the uploaded file from local storage
    fs.unlinkSync(req.file.path);

    // Create the category with the uploaded image details
    const category = {
        CategoryName: req.body.CategoryName,
        CategoryImage: {
            public_id: uploadedImage.public_id,
            secure_url: uploadedImage.secure_url,
        },
    };
    const categoryData = await Category.create(category);
    res.status(201).json(categoryData);
});

// Get all categories
const getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const categories = await Category.find();
    res.json(categories);
});

// Get a single category by ID
const getCategoryById = catchAsyncErrors(async (req, res, next) => {
    const category = await Category.findById({ _id: req.params.id });

    if (!category) {
        return next(new ErrorHandler(404, 'Category not found'));
    }
    res.json(category);
});

// Update a category by ID
const updateCategoryById = catchAsyncErrors(async (req, res, next) => {
    // Find the category by id
    const category = await Category.findById(req.params.id);

    // If category not found, return an error
    if (!category) {
        return next(new ErrorHandler(404, 'Category not found'));
    }

    // If there's an existing image, delete it from Cloudinary
    if (category.CategoryImage && category.CategoryImage.public_id) {
        const deletionResult = await cloudinary.uploader.destroy(
            category.CategoryImage.public_id
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

    // Update category with new data
    category.CategoryName = req.body.CategoryName;
    category.CategoryImage = {
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
    };

    // Save the updated category
    await category.save();
    console.log(category);
    res.json(category);
});

const deleteCategoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        // Find and delete the category

        const category = await Category.findByIdAndDelete(categoryId);

        if (!category) {
            return next(new ErrorHandler(404, 'Category not found'));
        }

        await cloudinary.uploader.destroy(category.CategoryImage.public_id);

        // Delete images associated with subcategories of the deleted category from Cloudinary
        const subcategories = await SubCategory.find({
            CategoryId: categoryId,
        });
        for (const subcategory of subcategories) {
            if (
                subcategory.SubCategoryImage &&
                subcategory.SubCategoryImage.public_id
            ) {
                await cloudinary.uploader.destroy(
                    subcategory.SubCategoryImage.public_id
                );
            }
        }

        // Find and delete subcategories associated with the deleted category
        await SubCategory.deleteMany({ CategoryId: categoryId });

        res.json({
            message:
                'Category and associated subcategories deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory: [verifyToken, authorizeAdmin, createCategory],
    updateCategoryById: [verifyToken, authorizeAdmin, updateCategoryById],
    deleteCategoryById: [verifyToken, authorizeAdmin, deleteCategoryById],
    getAllCategories,
    getCategoryById,
};
