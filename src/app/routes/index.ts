import { Router } from "express";
import bookRoutes from "../modules/Book/book.routes";
import borrowRoutes from "../modules/Borrow/borrow.routes";

const router = Router();

router.use("/api/books", bookRoutes);
router.use("/api/borrow", borrowRoutes);

export default router;
