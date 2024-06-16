import { Router } from 'express';

import UserRouter from './UserRoutes';
import CartRouter from './CartRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/cart', CartRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
