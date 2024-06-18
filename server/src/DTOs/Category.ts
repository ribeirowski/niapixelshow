import { z } from 'zod';

export const Category = z.object({
    name: z
        .string().min(1, 'O nome não pode ser vazio!')
        .regex(/^[a-zA-Z\u00C0-\u017F\s]+$/, { message: 'O nome deve conter apenas letras' }),
    description: z
        .string().optional(),
});

export const UpdateCategory = Category.partial();