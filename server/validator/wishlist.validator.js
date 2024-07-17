const { z } = require('zod');

// Define a Zod schema for the wishlist object
const wishlistSchema = z.object({
    products: z.array(z.string()), // Array of product IDs
    customer_id: z.string({ required_error: 'Customer ID is required' }),
});

module.exports = wishlistSchema;
