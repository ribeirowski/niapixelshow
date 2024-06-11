import { Router } from 'express';
import { ProductController } from '../controllers';

const ProductRouter = Router();

ProductRouter.route('/')
    .post(ProductController.create)//Rota para criar um novo produto
    .get(ProductController.readAll);//Rota para pegar todos os produtos cadastrados

ProductRouter.route('/:name')
    .put(ProductController.update)//Rota para atualizar um produto
    .patch(ProductController.deactivate)//Rota para desativar um produto
    .delete(ProductController.delete);//Rota para deletar um produto

export default ProductRouter;