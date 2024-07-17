const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    ],
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
