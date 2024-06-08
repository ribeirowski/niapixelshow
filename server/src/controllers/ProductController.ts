import { Request, Response, NextFunction } from 'express';
import { firestoreDB } from '../services/firebaseAdmin'; // Importa a instância correta do Firestore
import { Product, UpdateProduct } from '../DTOs';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';

class ProductController {

    //CREATE METHOD
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

    //UPDATE METHOD
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const productData = UpdateProduct.parse(req.body);

            // Verifica se o produto existe no Firestore
            const q = firestoreDB.collection('products').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            const productDoc = querySnapshot.docs[0];

            // Atualiza o produto no Firestore
            await productDoc.ref.update(productData);

            res.status(200).json({ message: 'Produto atualizado com sucesso', product: { ...productDoc.data(), ...productData } });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //DEACTIVATE METHOD
    async deactivate(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;

            // Verifica se o produto existe no Firestore
            const q = firestoreDB.collection('products').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            const productDoc = querySnapshot.docs[0];

            // Atualiza o status do produto para 'Indisponível'
            await productDoc.ref.update({ status: 'Indisponível' });

            res.status(200).json({ message: 'Produto desativado com sucesso', product: { ...productDoc.data(), status: 'Indisponível' } });
            return next();
        } catch (error) {
            return next(error);
        }
    }

     //DELET METHOD
     async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;

            // Verifica se o produto existe no Firestore
            const q = firestoreDB.collection('products').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            const productDoc = querySnapshot.docs[0];

            // Exclui o produto no Firestore
            await productDoc.ref.delete();

            res.status(200).json({ message: 'Produto excluído com sucesso' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

}

const productController = new ProductController();
export default productController;