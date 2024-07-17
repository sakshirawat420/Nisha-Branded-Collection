const mongoose = require('mongoose');

// Define your schema
const categorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    },
    CategoryImage: {
        public_id: String, // Define public_id as a string
        secure_url: String // Define secure_url as a string
    }
});

// Create your model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
