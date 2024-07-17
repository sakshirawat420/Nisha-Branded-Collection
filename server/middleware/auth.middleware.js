const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const { ErrorHandler } = require('../utils/error.js');
// Middleware to verify JWT token
const verifyToken = catchAsyncErrors((req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return next(new ErrorHandler(401, 'Access denied. Token is required'));
    }
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;

    next();
});

// Middleware to authorize admin access
const authorizeAdmin = catchAsyncErrors(async (req, res, next) => {
    // Extract userId from decoded token
    const userId = req.userId;

    // Fetch user from database using userId
    const user = await User.findById(userId);
    // If user not found or user is not admin, deny access
    if (!user || user.role !== 'admin') {
        return next(
            new ErrorHandler(403, 'Access denied. Admin role required')
        );
    }
    // If user is admin, allow access
    next();
});

module.exports = { verifyToken, authorizeAdmin };
