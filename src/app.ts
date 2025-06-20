import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
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



// route error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



// Global error handler
app.use((error: Error, req: Request, res: Response) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: 'something went wrong',
      error: error.message,
    });
  }
});





export default app;
