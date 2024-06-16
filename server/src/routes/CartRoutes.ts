import { Router } from 'express';
import { CartController } from '../controllers';

const CartRouter = Router();

CartRouter.route('/')
    .post(CartController.create); // Rota para criar um carrinho

CartRouter.route('/:id')
    .patch(CartController.update) // Rota para atualizar um carrinho por ID
    .patch(CartController.update_item) // Rota para atualizar um item do carrinho por ID
    .delete(CartController.delete) // Rota para deletar um carrinho por ID
    .delete(CartController.delete_item) // Rota para deletar um item do carrinho por ID

export default CartRouter;