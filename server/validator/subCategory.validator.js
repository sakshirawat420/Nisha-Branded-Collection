const { z } = require('zod');

const subCategorySchema = z.object({
    CategoryId: z.string({ required_error: 'Category ID is required' }).trim(),
    SubCategoryName: z
        .string({ required_error: 'Subcategory name is required' })
        .trim(),
    SubCategoryImage: z
        .object({
            public_id: z.string(),
            secure_url: z.string(),
        })
        .optional(),
});

module.exports = subCategorySchema;
