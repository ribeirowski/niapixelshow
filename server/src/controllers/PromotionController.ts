import { Request, Response, NextFunction } from "express";
import { firestoreDB } from "../services/firebase/firebaseAdmin";
import { Promotion, UpdatePromotion } from "../DTOs";

class PromotionController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const promotionData = Promotion.parse(req.body);

      // Verifica se o produto existe
      const productDoc = await firestoreDB
        .collection("products")
        .doc(promotionData.product_id)
        .get();
      if (!productDoc.exists) {
        return res.status(400).json({ message: "Product not found" });
      }

      // Verifica se a promoção já existe
      const promotionQuery = await firestoreDB
        .collection("promotions")
        .where("name", "==", promotionData.name)
        .get();
      if (!promotionQuery.empty) {
        return res.status(400).json({ message: "Promotion already exists" });
      }

      // Verifica se a data de início é anterior à data de término
      if (
        new Date(promotionData.start_date) > new Date(promotionData.end_date)
      ) {
        return res
          .status(400)
          .json({ message: "Start date must be before end date" });
      }

      // Verifica se a porcentagem de desconto é um número positivo entre 0 e 100
      if (promotionData.discount <= 0 && promotionData.discount > 100) {
        return res
          .status(400)
          .json({ message: "Discount must be a value between 1 and 100" });
      }

      // Salva a promoção no Firestore
      await firestoreDB.collection("promotions").add(promotionData);

      // id promoção
      const promotionDoc = await firestoreDB
        .collection("promotions")
        .where("name", "==", promotionData.name)
        .get();
      const id = promotionDoc.docs[0].id;

      // Atualiza o produto com a referência da promoção
      await firestoreDB
        .collection("products")
        .doc(promotionData.product_id)
        .update({ promotionId: id });

      // Pegando o preço atual do produto
      // @ts-ignore
      const price = productDoc.data().price;

      // Calculando o novo preço com desconto
      const newPrice = price - (price * promotionData.discount) / 100;

      // Atualizando o preço do produto no Firestore
      await firestoreDB
        .collection("products")
        .doc(promotionData.product_id)
        .update({ price: newPrice });

      res
        .status(201)
        .json({ message: "Promotion created successfully", id: id });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readById(req: Request, res: Response, next: NextFunction) {
    try {
      // Busca uma promoção específica
      const promotionId = req.params.id;
      const promotionDoc = await firestoreDB
        .collection("promotions")
        .doc(promotionId)
        .get();

      // Verifica se a promoção existe
      if (!promotionDoc.exists) {
        return res.status(404).json({ message: "Promotion not found" });
      }

      // Retorna a promoção encontrada
      const promotionData = promotionDoc.data();
      res.status(200).json({ id: promotionDoc.id, ...promotionData });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Busca todas as promoções
      const allPromotions = await firestoreDB.collection("promotions").get();
      const promotions = allPromotions.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(promotions);
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const promotionId = req.params.id;
      const promotionData = UpdatePromotion.parse(req.body);

      // Verifica se a promoção existe
      const promotionDoc = await firestoreDB
        .collection("promotions")
        .doc(promotionId)
        .get();
      if (!promotionDoc.exists) {
        return res.status(400).json({ message: "Promotion not found" });
      }

      // Verifica se a porcentagem de desconto é um número positivo entre 0 e 100
      // @ts-ignore
      if (promotionData.discount <= 0 && promotionData.discount > 100) {
        return res
          .status(400)
          .json({ message: "Discount must be a value between 1 and 100" });
      }

      // Atualiza a promoção no Firestore
      await firestoreDB
        .collection("promotions")
        .doc(promotionId)
        .update(promotionData);

      // Atualizando o preço do produto caso necessário
      // @ts-ignore
      if (promotionData.discount !== promotionDoc.data().discount) {
        // voltando ao valor original

        // get produto
        // @ts-ignore
        const productId = promotionDoc.data().product_id;
        const productDoc = await firestoreDB
          .collection("products")
          .doc(productId)
          .get();

        // pega o preço atual do produto com a promoção
        // @ts-ignore
        const price = productDoc.data().price;

        // pega o atual desconto
        // @ts-ignore
        const curDiscount = promotionDoc.data().discount;

        // calculando o preço sem desconto
        const oldPrice = price / (1 - curDiscount / 100);

        // calculando o novo preço com o novo desconto
        // @ts-ignore
        const newPrice = oldPrice * (1 - promotionData.discount / 100);

        // mudando o valor do produto com o novo preço
        await firestoreDB
          .collection("products")
          .doc(productId)
          .update({ price: newPrice });
      }

      res.status(200).json({ message: "Promotion updated successfully" });
      return next();
    } catch (error) {
      return next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const promotionId = req.params.id;

      // Verifica se a promoção existe
      const promotionDoc = await firestoreDB
        .collection("promotions")
        .doc(promotionId)
        .get();
      if (!promotionDoc.exists) {
        return res.status(400).json({ message: "Promotion not found" });
      }

      //Id do produto
      // @ts-ignore
      const productId = promotionDoc.data().product_id;

      // Deleta a promoção no Firestore
      await firestoreDB.collection("promotions").doc(promotionId).delete();

      // Atualiza o produto com a referência da promoção
      await firestoreDB
        .collection("products")
        .doc(productId)
        .update({ promotionId: null });

      //Atualizando o preço do produto
      const productDoc = await firestoreDB
        .collection("products")
        .doc(productId)
        .get();
      // @ts-ignore
      const price = productDoc.data().price;
      // @ts-ignore
      const discount = promotionDoc.data().discount;
      const newPrice = price / (1 - discount / 100);
      await firestoreDB
        .collection("products")
        .doc(productId)
        .update({ price: newPrice });

      res.status(200).json({ message: "Promotion deleted successfully" });
      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new PromotionController();
