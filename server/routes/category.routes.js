const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
} = require('../controller/category.controller');
const validateCategory = require('../middleware/validate.middleware');
const categorySchema = require('../validator/category.validator');
const { upload } = require('../middleware/multer.middleware');

// Create a new category
router.post(
    '/create',
    upload.single('CategoryImage'),
    validateCategory(categorySchema),
    createCategory
);

// Get all categories
router.get('/getAll', getAllCategories);

// Get a single category by ID
router.get('/get/:id', getCategoryById);

// Update a category by ID
router.put(
    '/edit/:id',
    upload.single('CategoryImage'),
    validateCategory(categorySchema),
    updateCategoryById
);

// Delete a category by ID
router.delete('/delete/:id', deleteCategoryById);

module.exports = router;
