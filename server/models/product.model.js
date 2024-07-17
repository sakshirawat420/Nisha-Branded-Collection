const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cuttedPrice: {
        type: Number,
        required: [true, 'Please enter cutted price'],
    },
    stock: {
        type: Number,
        required: true,
    },
    SubcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    sizes: [
        {
            type: String,
            required: true,
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
