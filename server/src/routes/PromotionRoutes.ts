import { Router } from 'express';
import { PromotionController } from '../controllers';

const PromotionRouter = Router();

PromotionRouter.route('/promotion')
    .post(PromotionController.create); // Rota para criar uma promoção

PromotionRouter.route('/promotion/all')
    .get(PromotionController.readAll); // Rota para buscar todas as promoções

PromotionRouter.route('/promotion/:id')
    .get(PromotionController.readById) // Rota para buscar uma promoção por ID
    .patch(PromotionController.update) // Rota para atualizar uma promoção por ID
    .delete(PromotionController.delete) // Rota para deletar uma promoção por ID

export default PromotionRouter;