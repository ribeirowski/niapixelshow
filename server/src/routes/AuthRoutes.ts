import { Router } from 'express';
import { AuthController } from '../controllers';

const AuthRouter = Router();

AuthRouter.route('/')
    .post(AuthController.create);

export default AuthRouter;