// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByTag,
    editProduct,
    deleteProduct,
} = require('../controller/product.controller');
const productSchema = require('../validator/product.validator');
const validateProduct = require('../middleware/validate.middleware');
const { upload } = require('../middleware/multer.middleware');

// Create a product
router.post(
    '/create',
    upload.array('images'),
    validateProduct(productSchema),
    createProduct
);

// Get all products
router.get('/getAll', getAllProducts);

// Get product by ID
router.get('/get/:id', getProductById);

// Get products by tag
router.get('/tag/:tag', getProductsByTag);

// Edit product
router.put(
    '/edit/:id',
    upload.array('images'),
    validateProduct(productSchema),
    editProduct
);

// Delete product
router.delete('/delete/:id', deleteProduct);

module.exports = router;
