const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    SubCategoryName: {
        type: String,
        required: true,
        unique: true,
    },
    SubCategoryImage: {
        public_id: String,
        secure_url: String,
    },
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
