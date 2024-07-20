import { Router } from 'express';
import { CartController } from '../controllers';
import { isAuthenticated } from '../middlewares';

const CartRouter = Router();

CartRouter.route('/:id/:item_id')
    .delete(isAuthenticated, CartController.delete_item) // Rota para deletar um item do carrinho por ID
    .put(isAuthenticated ,CartController.update_item) // Rota para atualizar um item do carrinho por ID

CartRouter.route('/:id/')
    .delete(isAuthenticated, CartController.delete) // Rota para apagar o carrinho por ID
    .post(isAuthenticated, CartController.add_item) // Rota para atualizar um carrinho por ID
    .get(isAuthenticated, CartController.get) // Rota para buscar um carrinho por ID

export default CartRouter;