import { z } from 'zod';

const createAccountValidationSchema = z.object({
    body: z.object({
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters')
            .max(50, 'First name cannot exceed 50 characters')
            .trim(),
        lastName: z
            .string()
            .min(2, 'Last name must be at least 2 characters')
            .max(50, 'Last name cannot exceed 50 characters')
            .trim(),
        email: z.string().email('Invalid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(20, 'Password cannot exceed 20 characters'),
    }),
});

export const UserValidation = {
    createAccountValidationSchema,
};