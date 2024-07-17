const express = require('express');
const router = express.Router();
const validateSubcategory = require('../middleware/validate.middleware');
const subCategorySchema = require('../validator/subCategory.validator');
const {
    createSubcategory,
    getAllSubcategories,
    getSubcategoryById,
    updateSubcategoryById,
    deleteSubcategoryById,
} = require('../controller/subCategory.controller');
const { upload } = require('../middleware/multer.middleware');

// Create a new subcategory
router.post(
    '/create',
    upload.single('SubCategoryImage'),
    validateSubcategory(subCategorySchema),
    createSubcategory
);

// Get all subcategories
router.get('/getAll', getAllSubcategories);

// Get a single subcategory by ID
router.get('/get/:id', getSubcategoryById);

// Update a subcategory by ID
router.put(
    '/edit/:id',
    upload.single('SubCategoryImage'),
    validateSubcategory(subCategorySchema),
    updateSubcategoryById
);

// Delete a subcategory by ID
router.delete('/delete/:id', deleteSubcategoryById);

module.exports = router;
