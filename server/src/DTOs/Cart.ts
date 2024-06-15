import {z} from 'zod';
import {User} from './User';

export const Cart = z.object({
  cart_id: z.string(),
  user_id: z.string(),
  items: z.array(User), 
  price: z.number(),
});

export const UpdateCart = Cart.partial();