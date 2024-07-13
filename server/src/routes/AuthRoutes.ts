import { Router } from 'express';
import { AuthController } from '../controllers';
import { isSameUserOrAdmin } from '../middlewares';

const AuthRouter = Router();

AuthRouter.route('/login')
    .post(AuthController.login);

AuthRouter.route('/logout')
    .post(isSameUserOrAdmin, AuthController.logout);

export default AuthRouter;
