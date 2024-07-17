const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { ErrorHandler } = require('../utils/error.js');

const createUser = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, password, address, role } =
        req.body;
    console.log(req.body);

    const existingUser = await User.findOne({
        email,
    });

    if (existingUser) {
        return next(new ErrorHandler(400, 'User already registered'));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        address,
        role,
    });

    console.log(user);
    // Respond with success message
    res.status(201).json(user);
});

const getUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler(404, 'User not found'));
    }
    res.json(user);
});

const getAllUsers = catchAsyncErrors(async (req, res) => {
    const users = await User.find();
    res.json(users);
});

const editUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const { firstName, lastName, email, password, phone, address, role } =
        req.body;

    // Hash the password if provided
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    // Prepare update object
    const update = {};
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;
    if (email) update.email = email;
    if (phone) update.phoneNumber = phone;
    if (hashedPassword) update.password = hashedPassword;
    if (address) update.address = address;
    if (role) update.role = role;

    // Update user document
    await User.findByIdAndUpdate(userId, update);

    // Respond with success message
    res.send('User updated successfully');
});
const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new ErrorHandler(404, 'User not found'));
    }

    // Delete associated reviews and their images
    const reviews = await Review.find({ user: userId });
    for (const review of reviews) {
        // Delete review images from Cloudinary
        for (const image of review.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }
        // Delete the review
        await Review.findByIdAndDelete(review._id);
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.send('User and associated resources deleted successfully');
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password, phone } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler(401, 'Invalid User'));
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return next(new ErrorHandler(401, 'Invalid Email or Password'));
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', {
        expiresIn: '1d',
    });
    res.json({ token });
});

// Get users by role
const getUsersByRole = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.params;
    const users = await User.find({ role });
    res.json(users);
});

module.exports = {
    createUser,
    getUser,
    getAllUsers,
    editUser,
    deleteUser,
    loginUser,
    getUsersByRole,
};
