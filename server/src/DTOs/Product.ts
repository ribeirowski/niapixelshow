import { z } from 'zod';

export const Product = z.object({
    name: z.string().nonempty({ message: 'O nome não pode ser vazio' }),
    description: z.string().nonempty({ message: 'A descrição não pode ser vazia' }),
    price: z.number().positive({ message: 'O preço deve ser um número positivo' }),
    status: z.enum(['Disponível', 'Indisponível']),
    category: z.string().nonempty({ message: 'A categoria não pode ser vazia' }),
});

export const UpdateProduct = Product.partial();