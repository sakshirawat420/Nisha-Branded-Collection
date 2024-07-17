// /src/server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./connection/user.connection');
const { handleNotFound, handleError } = require('./utils/error');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/categories', require('./routes/category.routes'));
app.use('/categories/subCategory', require('./routes/subCategory.routes'));
app.use('/categories/subCategory/product', require('./routes/product.routes'));
app.use('/', require('./routes/user.routes'));
app.use('/wishlist', require('./routes/wishlist.routes'));
app.use('/cart', require('./routes/cart.routes'));
app.use('/reviews', require('./routes/reviews.routes'));
app.use(handleNotFound);
app.use(handleError);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
