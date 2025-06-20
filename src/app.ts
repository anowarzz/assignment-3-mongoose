import cors from "cors";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.use(express.json());
app.use(cors());





// server status check
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server Running");
});

export default app;
