import { Router } from 'express';
import UserController from '../controllers/UserController';
import { isAuthenticated, isAdmin, isSameUserOrAdmin } from '../middlewares';

const UserRouter = Router();

UserRouter.route('/')
    .post(UserController.create); // Permitir que qualquer pessoa crie uma conta
    
UserRouter.route('/all')
    .get(isAuthenticated, isAdmin, UserController.readAll); // Apenas admin pode ver todos os usuários

UserRouter.route('/:id')
    .get(isAuthenticated, isSameUserOrAdmin, UserController.readById) // Usuário autenticado pode ver seus próprios dados
    .patch(isAuthenticated, isSameUserOrAdmin, UserController.update) // Usuário autenticado pode atualizar sua própria conta
    .delete(isAuthenticated, isSameUserOrAdmin, UserController.delete); // Usuário autenticado pode deletar sua própria conta

UserRouter.route('/email/:email')
    .post(UserController.verifyEmail)
    .get(isAuthenticated, isSameUserOrAdmin, UserController.readByEmail);

export default UserRouter;