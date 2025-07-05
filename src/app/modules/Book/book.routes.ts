import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoutes = Router();

bookRoutes.post("/", bookController.createBook);
bookRoutes.get("/", bookController.getAllBooks);
bookRoutes.get("/:bookId", bookController.getBookByID);
bookRoutes.patch("/:bookId", bookController.updateBook);
bookRoutes.delete("/:bookId", bookController.deleteBook);

export default bookRoutes;
