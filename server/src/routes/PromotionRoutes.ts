import { Router } from "express";
import { PromotionController } from "../controllers";
import { isAdmin, isAuthenticated } from "../middlewares";

const PromotionRouter = Router();

PromotionRouter.route("/").post(
  isAuthenticated,
  isAdmin,
  PromotionController.create
); // Rota para criar uma promoção

PromotionRouter.route("/").get(PromotionController.readAll); // Rota para buscar todas as promoções

PromotionRouter.route("/:id")
  .get(PromotionController.readById) // Rota para buscar uma promoção por ID
  .patch(isAuthenticated, isAdmin, PromotionController.update) // Rota para atualizar uma promoção por ID
  .delete(isAuthenticated, isAdmin, PromotionController.delete); // Rota para deletar uma promoção por ID

export default PromotionRouter;
