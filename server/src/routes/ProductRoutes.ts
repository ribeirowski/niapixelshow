import { Router } from 'express';
import { ProductController } from '../controllers';

const ProductRouter = Router();

ProductRouter.route('/')
    .post(ProductController.create);


export default ProductRouter;