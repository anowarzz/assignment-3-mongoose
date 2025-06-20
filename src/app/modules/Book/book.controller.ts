import { Request, Response } from "express";
import { Book } from "./book.model";



// creating a book in the db
const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const createdBook = await Book.create(bookData);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createdBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};




export const bookController = {
    createBook
}