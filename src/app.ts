import cors from "cors";
import express, { Application, Request, Response } from "express";
import { config } from "./app/config";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Server Running");
});

app.listen(config.port, () => {
  console.log(`Library DB Running On Port ${config.port}`);
});
