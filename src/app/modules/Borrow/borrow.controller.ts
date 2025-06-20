import { Request, Response } from "express";
import { Borrow } from "./borrow.model";

// create a borrow  in database
const createBorrow = async (req: Request, res: Response) => {
  try {
    const borrowData = req.body;
    const borrowedBook = await Borrow.create(borrowData);

    res.status(201).json({
      success: true,
      message: "Book Borrowed successfully",
      data: borrowedBook,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

export const borrowControllers = {
  createBorrow,
};
