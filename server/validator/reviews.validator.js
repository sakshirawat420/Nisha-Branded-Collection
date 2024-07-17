const { z } = require('zod');

const reviewSchema = z.object({
    user: z.string(),
    product: z.string(),
    rating: z.string(),
    comment: z.string(),
    date: z.date().optional(),
    images: z
        .array(
            z.object({
                public_id: z.string(),
                secure_url: z.string(),
            })
        )
        .optional(),
});

module.exports = reviewSchema;
