const { z } = require('zod');

const categorySchema = z.object({
    CategoryName: z.string({ required_error: 'Name is required' }).trim(),
    CategoryImage: z.object({
        public_id: z.string(),
        secure_url: z.string()
    }).optional()
});

module.exports = categorySchema;
