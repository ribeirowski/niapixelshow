import { Router } from 'express';

import UserRouter from './UserRoutes';
import PromotionRouter from './PromotionRoutes';

const router = Router();

router.use('/user', UserRouter);
router.use('/promotion', PromotionRouter);

router.route('/').get((_, res) => {
    res.status(200).send('Made with ❤️ by @ribeirowski');
});

export default router;
