import { Request, Response, NextFunction } from 'express';
import { auth } from '../services/firebase/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { adminAuth } from '../services/firebase/firebaseAdmin';

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
                user = await adminAuth.getUserByEmail(email);
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

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

             // Definir o cookie com o token
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: true, // Usar apenas em produção com HTTPS
                maxAge: 24 * 60 * 60 * 1000, // 1 dia
                sameSite: 'strict' // Ou 'Lax' dependendo da necessidade
            });
            

            res.status(200).json({ message: 'Login successful', token });
            return next();
        } catch (error: any) {
            return res.status(500).json({ message: 'Invalid credential' });
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await signOut(auth);
            res.clearCookie('authToken');
            res.status(200).json({ message: 'Logout successful' });
            return next();
        } catch (error: any) {
            return next(error);
        }
    }
};

export default new AuthController();
