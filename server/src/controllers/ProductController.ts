import { Request, Response, NextFunction } from 'express';
import { firestoreDB } from '../services/firebaseAdmin'; // Importa a instância correta do Firestore
import { Product, UpdateProduct } from '../DTOs';
import { collection, addDoc, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { HttpException } from '../middlewares';


class ProductController {

    //CREATE METHOD
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price, status, category } = req.body;

            // Verifica se todos os campos estão preenchidos
            if (!name || !description || !price || !status || !category) {
                throw new HttpException(400, "Todos os campos devem ser preenchidos");
            }
            // Verifica se o preço é um número positivo
            if (price <= 0) {
                throw new Error('O preço deve ser um número positivo');
            }
            const productData = Product.parse(req.body);
            // Verifica se já existe um produto com o mesmo nome
            const existsProductWithName = await firestoreDB.collection('products').where('name', '==', productData.name).get();
            if (!existsProductWithName.empty) {
                throw new HttpException(400, "Produto com esse nome já existe");
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
            const productId = req.params.id;
            const productData = UpdateProduct.parse(req.body);

            // Verifica se todos os campos estão preenchidos
            if (!productData.name || !productData.description || !productData.price || !productData.status || !productData.category) {
                throw new HttpException(400, "Todos os campos devem ser preenchidos");
            }

            // Verifica se o produto existe no Firestore
            const productdoc = await firestoreDB.collection('products').doc(productId).get();
            if (!productdoc.exists) {
                throw new HttpException(404, "Produto não encontrado");
            }

             // Atualiza as informações do produto no Firestore
             await firestoreDB.collection('products').doc(productId).update(productData);

             res.status(200).json({ message: 'Produto atualizado com sucesso', product: { id: productId, ...productData } });
             return next();
        }  catch (error) {
            return next(error);
        }
    }

    //DEACTIVATE METHOD
    async deactivate(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;

            const productdoc = await firestoreDB.collection('products').doc(productId).get();
            if (!productdoc.exists) {
                throw new HttpException(404, "Produto não encontrado");
            }

            // Exclui o produto no Firestore
            await firestoreDB.collection('products').doc(productId).update({ status: false });

            res.status(200).json({ message: 'Produto desativado com sucesso', product: { ...productdoc.data(), status: 'Indisponível' } });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //DELET METHOD
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;

            const productdoc = await firestoreDB.collection('products').doc(productId).get();
            if (!productdoc.exists) {
                throw new HttpException(404, "Produto não encontrado");
            }

            // Exclui o produto no Firestore
            await firestoreDB.collection('products').doc(productId).delete();

            res.status(200).json({ message: 'Produto excluído com sucesso' });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //READALL METHOD
    async readAll(req: Request, res: Response, next: NextFunction) {
        try {
            // Obtém todos os produtos do Firestore
            const querySnapshot = await firestoreDB.collection('products').get();
            const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            res.status(200).json(products);
            return next();
        } catch (error) {
            return next(error);
        }
    }

    //READ METHOD
    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req.params.id;

            const productdoc = await firestoreDB.collection('products').doc(productId).get();
            if (!productdoc.exists) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            const productData = productdoc.data();

            res.status(200).json({ product: productData });
            return next();
        } catch (error) {
            return next(error);
        }
    }

}

const productController = new ProductController();
export default productController;