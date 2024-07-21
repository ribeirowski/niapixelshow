import dotenv from "dotenv";
import routes from "./routes";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { errorHandler } from "./middlewares";
import cors from "cors";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);
app.use(errorHandler);

export default app;
