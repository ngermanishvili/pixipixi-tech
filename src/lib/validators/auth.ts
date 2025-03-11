import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must not exceed 12 characters'),
});

export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must not exceed 12 characters'),
    age: z.number()
        .int()
        .min(18, 'You must be at least 18 years old')
        .max(99, 'Age must not exceed 99'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;