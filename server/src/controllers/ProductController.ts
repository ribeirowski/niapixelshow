import { Request, Response, NextFunction } from 'express';
import { firestoreDB } from '../services/firebaseAdmin'; // Importa a instância correta do Firestore
import { Product, UpdateProduct } from '../DTOs';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const productData = Product.parse(req.body);

            // Verifica se já existe um produto com o mesmo nome
            const existsProductWithName = await firestoreDB.collection('products').where('name', '==', productData.name).get();
            if (!existsProductWithName.empty) {
                return res.status(400).json({ message: 'Product with this name already exists' });
            }

            // Adiciona o novo produto ao Firestore
            const productRef = await firestoreDB.collection('products').add(productData);

            res.status(201).json({ message: 'Produto cadastrado com sucesso', id: productRef.id, product: productData });
            return next();
        } catch (error) {
            return next(error);
        }
    }
}

const productController = new ProductController();
export default productController;