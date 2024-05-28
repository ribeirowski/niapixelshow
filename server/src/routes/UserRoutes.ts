import { Router } from 'express';
import { UserController } from '../controllers';

const UserRouter = Router();

UserRouter.route('/')
    .post(UserController.create); // Rota para criar um usuário

UserRouter.route('/all')
    .get(UserController.readAll); // Rota para buscar todos os usuários

UserRouter.route('/:id')
    .get(UserController.read) // Rota para buscar um usuário por ID
    .patch(UserController.update) // Rota para atualizar um usuário por ID
    .delete(UserController.delete) // Rota para deletar um usuário por ID

export default UserRouter;