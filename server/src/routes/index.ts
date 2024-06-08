import { Router } from 'express';

import UserRouter from './UserRoutes';
import ProductRouter from './ProductRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/product', ProductRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
