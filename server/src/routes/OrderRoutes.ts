import Router from 'express';
import { OrderController } from '../controllers';

const OrderRouter = Router();

OrderRouter.route('/')
    .post(OrderController.create); // Rota para criar um pedido

OrderRouter.route('/:id')
    .patch(OrderController.update); // Rota para atualizar um pedido por ID

export default OrderRouter;