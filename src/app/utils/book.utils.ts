import mongoose from "mongoose";
import { Book } from "../modules/Book/book.model";

export const checkBookExists = async (bookId: string): Promise<boolean> => {
  // Check if book id valid
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    throw new Error("Invalid book ID format");
  }

  // Find the book by book ID
  const book = await Book.findById(bookId);

  // If book not found with valid ID
  if (!book) {
    throw new Error("No book found with this ID");
  }

  return true;
};
