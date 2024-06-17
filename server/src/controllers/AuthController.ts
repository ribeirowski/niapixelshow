import { Request, Response, NextFunction } from 'express';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { adminAuth } from '../services/firebaseAdmin';

class AuthController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
    
            // Verificar se o email e a senha foram  fornecidos
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            // Verificar se o email está verificado
            const user = await adminAuth.getUserByEmail(email);
            if (!user.emailVerified) {
                return res.status(400).json({ message: 'Email not verified' });
            }

            await signInWithEmailAndPassword(auth, email, password);

            res.status(200).json({ message: 'Login successful' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
};

const authController = new AuthController();
export default authController;