import { Router } from 'express';
import { ProductController } from '../controllers';
import { errorHandler } from '../middlewares';

const ProductRouter = Router();

ProductRouter.route('/')
    .post(ProductController.create)//Rota para criar um novo produto
    .get(ProductController.readAll);//Rota para pegar todos os produtos cadastrados

ProductRouter.route('/:id')
    .get(ProductController.read)//Rota para pegar um produto pelo nome
    .put(ProductController.update)//Rota para atualizar um produto
    .patch(ProductController.deactivate)//Rota para desativar um produto
    .delete(ProductController.delete);//Rota para deletar um produto

export default ProductRouter;