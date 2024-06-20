import {Request, Response, NextFunction} from 'express';
import {firestoreDBTest} from '../services/firebaseAdmin';
import {Category, UpdateCategory} from '../DTOs';

class CategoryController {
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const {name, description} = req.body;

            if (!name) {
                return res.status(400).json({ message: 'O nome da categoria deve ser preenchidos!' });
            }
            const categoryData = Category.parse(req.body);
            
            const sameCategoryName = await firestoreDBTest.collection('categories').where('name', '==', categoryData.name).get();
            if (!sameCategoryName.empty) {
                return res.status(400).json({ message: 'Já existe uma categoria com esse nome!' });
            }

            const categoryRecord = await firestoreDBTest.collection('categories').add(categoryData);

            res.status(201).json({ message: 'Categoria cadastrada com sucesso', id: categoryRecord.id, category: categoryData });
            return next();
    
        } catch (error) {
            return next(error);
        }
    }

    async update (req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const categoryData = UpdateCategory.parse(req.body);

            const q = firestoreDBTest.collection('categories').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(400).json({ message: 'Essa categoria não existe!' });
            }
            const categoryDoc = querySnapshot.docs[0];

            await categoryDoc.ref.update(categoryData);

            res.status(200).json({ message: 'Categoria atualizada com sucesso!', product: { ...categoryDoc.data(), ...categoryData } });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async readAll (req: Request, res: Response, next: NextFunction) {
        try {
            const querySnapshot = await firestoreDBTest.collection('categories').get();
            const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            res.status(200).json(categories);
            return next();
        } catch (error) {
            return next(error);
        }

    }

    async read (req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;

            const q = firestoreDBTest.collection('categories').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'Essa categoria não existe!' });
            }
            const categoryDoc = querySnapshot.docs[0];

            res.status(200).json({ id: categoryDoc.id, ...categoryDoc.data() });
            return next();
        } catch (error) {
            return next(error);
        }
    }

    async delete (req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;

            const q = firestoreDBTest.collection('categories').where('name', '==', name);
            const querySnapshot = await q.get();
            if (querySnapshot.empty) {
                return res.status(404).json({ message: 'Categoria não encontrada!' });
            }
            const categoryDocs = querySnapshot.docs[0];

            await categoryDocs.ref.delete();

            res.status(200).json({ message: 'Categoria excluída com sucesso!' });
            return next();
        } catch (error) {
            return next(error);
        }
    }
};

const categoryController = new CategoryController();
export default categoryController;