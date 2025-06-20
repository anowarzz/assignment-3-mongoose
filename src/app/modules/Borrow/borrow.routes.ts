import { Router } from "express";
import { borrowControllers } from "./borrow.controller";

const borrowRoutes = Router();


borrowRoutes.post("/", borrowControllers.createBorrow)



export default borrowRoutes;
