import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../services/firebase/firebaseAdmin';
import { DecodedIdToken } from 'firebase-admin/auth';

interface CustomRequest extends Request {
    user?: DecodedIdToken;
}

export const isAuthenticated = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        req.user = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    if (!user || !user.is_admin) {
        return res.status(403).json({ message: 'Admin privileges are required' });
    }
    return next();
};

export const isSameUserOrAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { user } = req;
    const userId = req.params.id || req.body.id;
    const email = req.params.email || req.body.email;

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    // Verifica se o usuário autenticado é o mesmo da requisição ou é um administrador
    if ((user.uid !== userId && user.email !== email) && !user.is_admin) {
        return res.status(403).json({ message: 'Permission denied' });
    }

    return next();
};