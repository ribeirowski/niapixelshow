import { Router } from 'express';
import UserRouter from './UserRoutes';
import PromotionRouter from './PromotionRoutes';
import AuthRouter from './AuthRoutes';
import ProductRouter from './ProductRoutes';
import OrderRouter from './OrderRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/promotion', PromotionRouter);
router.use('/auth', AuthRouter);
router.use('/product', ProductRouter);
router.use('/order', OrderRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
