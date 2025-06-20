import { Router } from "express";
import { borrowControllers } from "./borrow.controller";

const borrowRoutes = Router();


borrowRoutes.post("/", borrowControllers.createBorrow)
borrowRoutes.get("/", borrowControllers.getBorrowSummary)



export default borrowRoutes;
