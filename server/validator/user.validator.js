const { z } = require('zod');

const userSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().min(10),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']),
});

module.exports = userSchema;
