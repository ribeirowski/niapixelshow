import { Router } from "express";
import { EmailController } from "../controllers";

const EmailRouter = Router();

EmailRouter.route("/:mail").post(EmailController.send); // Enviar email

export default EmailRouter;
