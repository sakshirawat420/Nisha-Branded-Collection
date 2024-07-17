const { z } = require('zod');

const cartItemSchema = z.object({
    product: z.string().nonempty(),
    quantity: z.number().int().positive(),
});

const cartSchema = z.object({
    items: z.array(cartItemSchema),
    customer_id: z.string().nonempty(),
});

module.exports = cartSchema;
