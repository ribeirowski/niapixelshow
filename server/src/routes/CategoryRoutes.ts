import { Router } from 'express';
import { CategoryController } from '../controllers';

const CategoryRouter = Router();

CategoryRouter.route('/')
    .post(CategoryController.create); 

CategoryRouter.route('/all')
    .get(CategoryController.readAll); 

CategoryRouter.route('/:name')
    .get(CategoryController.read)
    .put(CategoryController.update)
    .delete(CategoryController.delete);

export default CategoryRouter;