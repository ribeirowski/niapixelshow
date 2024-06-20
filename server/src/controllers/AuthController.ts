import { Request, Response, NextFunction } from 'express';
import { authTest } from '../services/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/authTest';
import { adminAuthTest } from '../services/firebaseAdmin';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            // Verificar se o email e a senha foram fornecidos
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Verificar se o email está cadastrado
            let user;
            try {
                user = await adminAuthTest.getUserByEmail(email);
            } catch (error: any) {
                if (error.code === 'authTest/user-not-found') {
                    return res.status(400).json({ message: 'Email not found' });
                }
                // Tratar outros erros
                return next(error);
            }

            // Verificar se o email está verificado
            if (!user.emailVerified) {
                return res.status(400).json({ message: 'Email not verified' });
            }

            await signInWithEmailAndPassword(authTest, email, password);

            res.status(200).json({ message: 'Login successful' });
            return next();
        } catch (error: any) {
            return next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await signOut(authTest);
            res.status(200).json({ message: 'Logout successful' });
            return next();
        } catch (error: any) {
            return next(error);
        }
    }
}

const authController = new AuthController();
export default authController;
