import { Request, Response, NextFunction } from 'express';
import { adminAuthTest, firestoreDBTest } from '../services/firebaseAdmin';
import { authTest } from '../services/firebase';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { User, UpdateUser } from '../DTOs';
import { hash } from 'bcryptjs';

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = User.parse(req.body);

            // Verifica se já existe um usuário com o mesmo e-mail
            const existsUserWithEmail = await firestoreDBTest.collection('users').where('email', '==', userData.email).get();
            if (!existsUserWithEmail.empty) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hash da senha
            const hashedPassword = await hash(userData.password, 6);

            // Crie o usuário no Firebase Authentication
            const userRecord = await adminAuthTest.createUser({
                email: userData.email,
                password: userData.password,
                displayName: userData.name,
                disabled: false,
                emailVerified: false
            });

            const userCredential = await signInWithEmailAndPassword(authTest, userData.email, userData.password);
            const user = userCredential.user;

            // Envia o e-mail de verificação para o usuário
            await sendEmailVerification(user);

            // Prepara as informações do usuário para salvar no Firestore, substituindo a senha pelo hash
            const userDataForFirestore = {
                ...userData,
                password: hashedPassword
            };

            // Salva as informações do usuário no Firestore
            await firestoreDBTest.collection('users').doc(userRecord.uid).set(userDataForFirestore);

            res.status(201).json({ message: 'User created successfully', id: userRecord.uid, email: userData.email, name: userData.name });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const userData = UpdateUser.parse(req.body);

            // Verifica se o usuário existe
            const userDoc = await firestoreDBTest.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Atualiza as informações do usuário no Firestore
            await firestoreDBTest.collection('users').doc(userId).update(userData);

            res.status(200).json({ message: 'User updated successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
            const allUsers = await firestoreDBTest.collection('users').get();
            const users = allUsers.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(users); // Apenas uma resposta aqui
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const userDoc = await firestoreDBTest.collection('users').doc(userId).get();
            if (!userDoc.exists) {
                return res.status(404).json({ message: 'User not found' }); // Aqui enviamos uma resposta se o usuário não for encontrado
            }
            const userData = userDoc.data();
            res.status(200).json({ id: userDoc.id, ...userData }); // Aqui enviamos a resposta com os dados do usuário encontrado
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            
            await firestoreDBTest.collection('users').doc(userId).delete();
            await adminAuthTest.deleteUser(userId);
            
            res.status(200).json({ message: 'User deleted successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
};

const userController = new UserController();
export default userController;