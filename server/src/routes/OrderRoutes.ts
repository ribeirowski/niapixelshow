import { Router } from "express";
import { OrderController } from "../controllers";
import { isAuthenticated, isAdmin } from "../middlewares";

const OrderRouter = Router();

OrderRouter.route("/").post(OrderController.create); // Rota para criar um pedido

OrderRouter.route("/all").get(
  isAuthenticated,
  isAdmin,
  OrderController.readAll
); // Rota para buscar todos os pedidos

OrderRouter.route("/stats").get(OrderController.getStats); // Rota para buscar estatísticas de pedidos

OrderRouter.route("/export").get(
  isAuthenticated,
  isAdmin,
  OrderController.export
); //Rota para exportar dados dos pedidos

OrderRouter.route("/filterByDate").get(
  isAuthenticated,
  isAdmin,
  OrderController.readByDate
); //Rota para filtrar pela data

OrderRouter.route("/:id")
  .get(OrderController.read) // Rota para buscar um pedido por ID
  .patch(OrderController.update) // Rota para atualizar um pedido por ID
  .delete(OrderController.delete); // Rota para deletar um pedido por ID

OrderRouter.route("/filter/:filtro").get(OrderController.filterAll);

export default OrderRouter;
