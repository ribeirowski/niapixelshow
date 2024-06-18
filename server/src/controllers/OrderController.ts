import { Request, Response, NextFunction } from 'express';
import { firestoreDB } from '../services/firebaseAdmin'; // Importa a instância correta do Firestore
import { Order, UpdateOrder, Product, UpdateProduct } from '../DTOs';
import { collection, addDoc, getDocs, doc, updateDoc, query, where, orderBy } from 'firebase/firestore';

class OrderController{

    //CREATE METHOD
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, item, description, qtd, price, status, date, addr } = req.body;

            // Verifica se todos os campos estão preenchidos
            if (!email || !item || !description || !qtd || !price || !status || !date || !addr) {
                return res.status(400).json({ message: 'Todos os campos devem ser preenchidos' });
            }
            const orderData = Order.parse(req.body);
            // Adiciona o novo produto ao Firestore
            const orderRef = await firestoreDB.collection('orders').add(orderData);

            res.status(201).json({ message: 'Pedido cadastrado com sucesso', id: orderRef.id, product: orderData });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //UPDATE METHOD
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id;
            const orderData = UpdateOrder.parse(req.body);

            // Verifica se o pedido existe
            const orderDoc = await firestoreDB.collection('orders').doc(orderId).get();
            if (!orderDoc.exists) {
                return res.status(404).json({ message: 'Order not found' });
            }

            // Atualiza as informações do pedido no Firestore
            await firestoreDB.collection('orders').doc(orderId).update(orderData);

            res.status(200).json({ message: 'Order updated successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //READ ALL METHOD
    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
            const allOrders = await firestoreDB.collection('orders').get();
            const orders = allOrders.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            res.status(200).json(orders); // Apenas uma resposta aqui
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //GET STATS METHOD
    async getStats(req: Request, res: Response, next: NextFunction) {
        try {
            // Get all products or paid orders
            const allOrders = await firestoreDB.collection('orders').where("status", "==", "Pago").orderBy('item').get();
            const orders = allOrders.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Establish stats to be sent
            var totalValue = 0;
            var mostSold = 'none';
            var productAmount = [0];
            var productValue = [0];
            var productName = [''];
            var index = 0;
            var first = 0;
            allOrders.forEach(element => {
                const orderVar = Order.parse(element);
                if(orderVar.item != productName[index]) {
                    if(!first) {
                        index = index + 1;
                        productName.push(orderVar.item);
                        productAmount.push(0);
                        productValue.push(0);
                    }
                    else {
                        first = 0;
                        productName[index] = orderVar.item;
                    }
                }
                totalValue = totalValue + orderVar.price;
                productAmount[index] = productAmount[index] + orderVar.qtd;
                productValue[index] = productValue[index] + orderVar.price;
            });
            res.status(200).json({ totalValue, mostSold, productName, productAmount, productValue });
            return next();
        } catch(error) {
            return next(error);
        }
    }

    //READ METHOD
    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id;
            const orderDoc = await firestoreDB.collection('orders').doc(orderId).get();
            if (!orderDoc.exists) {
                return res.status(404).json({ message: 'order not found' }); // Aqui enviamos uma resposta se o pedido não for encontrado
            }
            const orderData = orderDoc.data();
            res.status(200).json({ id: orderDoc.id, ...orderData }); // Aqui enviamos a resposta com os dados do pedido encontrado
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //DELETE METHOD
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id;
            await firestoreDB.collection('orders').doc(orderId).delete();
            res.status(200).json({ message: 'order deleted successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
}
const orderController = new OrderController();
export default orderController;