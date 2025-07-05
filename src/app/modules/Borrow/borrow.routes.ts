import { Router } from "express";
import { borrowControllers } from "./borrow.controller";

const borrowRoutes = Router();


borrowRoutes.post("/:bookId", borrowControllers.createBorrow)
borrowRoutes.get("/", borrowControllers.getBorrowSummary)



export default borrowRoutes;
