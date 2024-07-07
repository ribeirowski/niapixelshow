import { Router } from 'express';
import { AuthController } from '../controllers';
import { isAuthenticated } from '../middlewares';

const AuthRouter = Router();

AuthRouter.route('/login')
    .post(AuthController.login);

AuthRouter.route('/logout')
    .post(isAuthenticated, AuthController.logout);

export default AuthRouter;
