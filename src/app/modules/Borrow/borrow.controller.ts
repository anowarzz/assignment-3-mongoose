import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

// create a borrow in database
const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrowBookData = req.body;

    
    // borrow book
    const borrowedBook = await Borrow.create(borrowBookData);
    
    // Check and update book availability if needed
    await Borrow.updateBookAvailability(borrowBookData.book);
    
    res.status(201).json({
      success: true,
      message: "Book Borrowed successfully",
      data: borrowedBook,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Validation failed",
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
