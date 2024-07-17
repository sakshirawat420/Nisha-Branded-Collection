// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    getUser,
    getAllUsers,
    editUser,
    deleteUser,
    loginUser,
    getUsersByRole, // Import getUsersByRole function
} = require('../controller/user.controller');

// Create a new user
router.post('/user/create', createUser);

// User login
router.post('/user/login', loginUser);

// Get a user by ID
router.get('/user/get/:id', getUser);

// Get all users
router.get('/user/getall', getAllUsers);

// Get users by role
router.get('/user/getbyrole/:role', getUsersByRole); // New route for getting users by role

// Edit a user
router.patch('/user/edit/:id', editUser);

// Delete a user
router.delete('/user/delete/:id', deleteUser);

module.exports = router;
