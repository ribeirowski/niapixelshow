import {z} from 'zod';
import {Product} from './Product';

const Item = Product.extend({ 
  quantity: z.number().int().positive({ message: 'A quantidade deve ser um número positivo' }),
  size: z.string().nonempty({ message: 'O tamanho não pode ser vazio' }),
});

export const Order = z.object({
    order_id: z.string(),
    user_id: z.string(),
    items: z.array(Item), 
    price: z.number(),
    status: z.string(),
    created_at: z.string(),
});

export const UpdateOrder = Order.partial();