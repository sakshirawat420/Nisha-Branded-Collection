const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
