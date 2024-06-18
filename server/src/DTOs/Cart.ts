import {z} from 'zod';
import {Product} from './Product';

export const CartItem = Product.extend({ 
  quantity: z.number().int().positive({ message: 'A quantidade deve ser um número positivo' }),
  size: z.string(),
});

export const Cart = z.object({
  user_id: z.string().nonempty({ message: 'O ID do usuário não pode ser vazio' }),
  items: z.array(CartItem).nonempty({ message: 'O carrinho não pode estar vazio' }), 
  price: z.number().positive({ message: 'O preço deve ser um número positivo' }),
});

export const UpdateCart = Cart.partial();