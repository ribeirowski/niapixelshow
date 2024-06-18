import { Router } from 'express';
import { AuthController } from '../controllers';

const AuthRouter = Router();

AuthRouter.route('/login')
    .post(AuthController.login);

AuthRouter.route('/logout')
    .post(AuthController.logout);

export default AuthRouter;