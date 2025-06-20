import { Request, Response } from "express";
import { Book } from "./book.model";

// Create a book in the db
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

// Get all books from db
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const allBooks = await Book.find();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get all books",
      success: false,
      error: error,
    });
  }
};

// get single book by id
const getBookByID = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to get book",
      success: false,
      error: error,
    });
  }
};

export const bookController = {
  createBook,
  getAllBooks,
  getBookByID
};
