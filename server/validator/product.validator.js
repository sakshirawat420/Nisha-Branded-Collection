const { z } = require('zod');

const productSchema = z.object({
    productName: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    price: z.string().min(1).optional(),
    cuttedPrice: z.string().min(1).optional(),
    stock: z.string().min(1).optional(),
    SubcategoryId: z.string().min(1).optional(),
    CategoryId: z.string().min(1).optional(),
    tags: z.array(z.string()).optional(),
    images: z
        .array(
            z.object({
                public_id: z.string().min(1),
                secure_url: z.string().min(1),
            })
        )
        .optional(),
    createdAt: z.date().optional(),
    numOfReviews: z.string().min(1).optional(),
    sizes: z.array(z.string().min(1)).optional(),
});

module.exports = productSchema;
