import { Router } from 'express';

import UserRouter from './UserRoutes';
import PromotionRouter from './PromotionRoutes';
import AuthRouter from './AuthRoutes';
import ProductRouter from './ProductRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/promotion', PromotionRouter);
router.use('/login', AuthRouter);
router.use('/product', ProductRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
