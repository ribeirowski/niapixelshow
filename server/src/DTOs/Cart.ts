import {z} from 'zod';
import {Product} from './Product';

const CartItem = Product.extend({ 
  quantity: z.number().int().positive({ message: 'A quantidade deve ser um número positivo' }),
  size: z.string().nonempty({ message: 'O tamanho não pode ser vazio' }),
});

export const Cart = z.object({
  cart_id: z.string(),
  user_id: z.string(),
  items: z.array(CartItem), 
  price: z.number(),
});

export const UpdateCart = Cart.partial();