import { Request, Response, NextFunction } from 'express';
import { adminAuth, firestoreDB } from '../services/firebaseAdmin';
import { Cart, UpdateCart } from '@DTOs';
import { hash } from 'bcryptjs';

class CartController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const cartData = Cart.parse(req.body);

            // Salva as informações do carrinho no Firestore
            await firestoreDB.collection('carts').doc(cartData.user_id).set(cartData);

            res.status(201).json({ message: 'Cart created successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const cartData = UpdateCart.parse(req.body);

            // Verifica se o carrinho existe
            const cartDoc = await firestoreDB.collection('carts').doc(userId).get();
            if (!cartDoc.exists) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Atualiza as informações do carrinho no Firestore
            await firestoreDB.collection('carts').doc(userId).update(cartData);

            res.status(200).json({ message: 'Cart updated successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async update_item(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const itemId = req.params.item_id;
            const itemData = Cart.parse(req.body);

            // Verifica se o carrinho existe
            const cartDoc = await firestoreDB.collection('carts').doc(userId).get();
            if (!cartDoc.exists) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Atualiza o item do carrinho
            const cartData = cartDoc.data();
            if (!cartData) {
                return res.status(404).json({ message: 'Cart data not found' });
            }

            const updatedItems = cartData.items.map((item: any) => {
                if (item.id === itemId) {
                    return itemData;
                }
                return item;
            });

            await firestoreDB.collection('carts').doc(userId).update({ items: updatedItems });

            res.status(200).json({ message: 'Item updated successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            // Verifica se o carrinho existe
            const cartDoc = await firestoreDB.collection('carts').doc(userId).get();
            if (!cartDoc.exists) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Deleta o carrinho do Firestore
            await firestoreDB.collection('carts').doc(userId).delete();

            res.status(200).json({ message: 'Cart deleted successfully' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete_item(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const itemId = req.params.item_id;

            // Verifica se o carrinho existe
            const cartDoc = await firestoreDB.collection('carts').doc(userId).get();
            if (!cartDoc.exists) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            // Deleta o item do carrinho
            const cartData = cartDoc.data();
            if (!cartData) {
                return res.status(404).json({ message: 'Cart data not found' });
            }

            const updatedItems = cartData.items.filter((item: any) => item.id !== itemId);
            await firestoreDB.collection('carts').doc(userId).update({ items: updatedItems });

            res.status(200).json({ message: 'Item deleted successfully' });
            return next();

        } catch (error) {
            return next(error);
        }
    }
}

const cartController = new CartController();
export default cartController;