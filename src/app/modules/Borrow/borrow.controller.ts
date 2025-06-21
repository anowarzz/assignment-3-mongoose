import { Request, Response } from "express";
import { Book } from "../Book/book.model";
import { Borrow } from "./borrow.model";

// create a borrow  in database
const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book, quantity } = req.body;
    // finding book with book id
    const bookToBorrow = await Book.findById(book);

    if (!bookToBorrow) {
      res.status(404).json({
        success: false,
        message: "Book not found with the provided id",
      });
      return;
    }
    // book availablity check
    if ((bookToBorrow.copies as number) < quantity) {
      res.status(400).json({
        success: false,
        message: `Cannot borrow ${quantity} pcs. Only ${bookToBorrow?.copies} pcs available`,
      });
      return;
    }

    // updating copies count
    const updatedCopiesBook = await Book.findByIdAndUpdate(book, {
      $inc: { copies: -quantity },
    });

    if (!updatedCopiesBook) {
      res.status(500).json({
        success: false,
        message: "Failed to update book stock.",
      });
      return;
    }

    // Check and update book availability if needed
    const availabilityUpdated = await Borrow.updateBookAvailability(book);

    if (!availabilityUpdated) {
      console.log("Failed to update book availability status");
    }

    // borrow creation
    const borrowedBook = await Borrow.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book Borrowed successfully",
      data: borrowedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

// Get borrow book summary
const getBorrowSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrowSummary = await Borrow.aggregate([
      {
        $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: 1,
            isbn: 1,
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrowSummary,
    });
  } catch (error) {
    res.status(400).json({
      message: "Book Summary Retrieval Failed",
      success: false,
      error: error,
    });
  }
};

export const borrowControllers = {
  createBorrow,
  getBorrowSummary,
};
