import { Router } from 'express';

import UserRouter from './UserRoutes';
import CartRouter from './CartRoutes';
import OrderRouter from './OrderRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/cart', CartRouter);
router.use('/order', OrderRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
