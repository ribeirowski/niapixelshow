import { Router } from "express";
import { ProductController } from "../controllers";
import { isAuthenticated, isAdmin } from "../middlewares";

const ProductRouter = Router();

ProductRouter.route("/")
  .post(isAuthenticated, isAdmin, ProductController.create) //Rota para criar um novo produto
  .get(ProductController.readAll); //Rota para pegar todos os produtos cadastrados

ProductRouter.route("/:id")
  .get(ProductController.read) //Rota para pegar um produto pelo nome
  .put(isAuthenticated, isAdmin, ProductController.update) //Rota para atualizar um produto
  .patch(isAuthenticated, isAdmin, ProductController.deactivate) //Rota para desativar um produto
  .delete(isAuthenticated, isAdmin, ProductController.delete); //Rota para deletar um produto

export default ProductRouter;
