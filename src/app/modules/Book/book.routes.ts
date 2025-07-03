import { Router } from "express";
import { bookController } from "./book.controller";

const bookRoutes = Router();

bookRoutes.post("/create-book", bookController.createBook);
bookRoutes.get("/", bookController.getAllBooks);
bookRoutes.get("/:bookId", bookController.getBookByID);
bookRoutes.put("/:bookId", bookController.updateBook);
bookRoutes.delete("/:bookId", bookController.deleteBook);

export default bookRoutes;
