const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
});

module.exports.User = mongoose.model('User', userSchema);
