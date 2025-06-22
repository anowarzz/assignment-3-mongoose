import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

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



// route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



// Global error handler
app.use(globalErrorHandler);





export default app;
