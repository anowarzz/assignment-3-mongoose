import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Borrow } from "./borrow.model";

// create a borrow in database
const createBorrow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const borrowBookData = req.body;

    // check if the id is valid object id
    if (!Types.ObjectId.isValid(borrowBookData.book)) {
      throw new Error("Invalid book ID");
    }

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
    error.customMessage = "Failed to create borrow record";
    next(error);
  }
};

// Get borrow book summary
const getBorrowSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (error: any) {
    error.customMessage = "Failed to retrieve borrow summary";
    next(error);
  }
};

export const borrowControllers = {
  createBorrow,
  getBorrowSummary,
};
