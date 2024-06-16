import { Request, Response, NextFunction } from 'express';
import { adminAuth, firestoreDB } from '../services/firebaseAdmin';
import { Order, UpdateOrder } from '@DTOs';
import { hash } from 'bcryptjs';

class OrderController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const orderData = Order.parse(req.body);

            // Salva as informações do pedido no Firestore
            await firestoreDB.collection('orders').doc(orderData.user_id).set(orderData);

            res.status(201).json({ message: 'Order created successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const orderData = UpdateOrder.parse(req.body);

            // Verifica se o pedido existe
            const orderDoc = await firestoreDB.collection('orders').doc(userId).get();
            if (!orderDoc.exists) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Atualiza as informações do pedido no Firestore
            await firestoreDB.collection('orders').doc(userId).update(orderData);

            res.status(200).json({ message: 'Order updated successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

const orderController = new OrderController();
export default orderController;