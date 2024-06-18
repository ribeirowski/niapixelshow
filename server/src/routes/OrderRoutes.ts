import { Router } from 'express';
import { OrderController } from '../controllers';

const OrderRouter = Router();

OrderRouter.route('/')
    .post(OrderController.create); // Rota para criar um pedido

OrderRouter.route('/all')
    .get(OrderController.readAll); // Rota para buscar todos os pedidos

OrderRouter.route('/stats')
    .get(OrderController.getStats); // Rota para buscar estatísticas de pedidos

OrderRouter.route('/:id')
    .get(OrderController.read) // Rota para buscar um pedido por ID
    .patch(OrderController.update) // Rota para atualizar um pedido por ID
    .delete(OrderController.delete); // Rota para deletar um pedido por ID

OrderRouter.route('/filter/:filtro')
    .get(OrderController.filterAll)

export default OrderRouter;