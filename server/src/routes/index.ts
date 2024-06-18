import { Router } from 'express';

import UserRouter from './UserRoutes';
import AuthRouter from './AuthRoutes';
import ProductRouter from './ProductRoutes';
import CategoryRouter from './CategoryRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/login', AuthRouter);
router.use('/product', ProductRouter);
router.use('/category', CategoryRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
