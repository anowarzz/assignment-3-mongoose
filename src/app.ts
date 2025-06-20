import cors from "cors";
import express, { Application, Request, Response } from "express";
import bookRoutes from "./app/modules/Book/book.routes";
import router from "./app/routes";

const app: Application = express();

// middlewares
app.use(express.json());
app.use(cors());

// using routes
app.use(router);

// server status check
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server Running");
});

export default app;
