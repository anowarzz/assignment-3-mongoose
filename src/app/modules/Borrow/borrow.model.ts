import { model, Schema, Types } from "mongoose";
import { Book } from "../Book/book.model";
import { BorrowStaticMethods, IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "You have to borrow at least 1 copy"],
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value: Date) {
          return value > new Date();
        },
        message: "Due date must be in the future",
      },
    },
  },
  { versionKey: false, timestamps: true }
);

// static method to set availability false if stock copies =  0
borrowSchema.static(
  "updateBookAvailability",
  async function updateBookAvailability(bookId: Types.ObjectId) {
    const book = await Book.findById(bookId);

    if (book?.copies === 0) {
      await Book.findByIdAndUpdate(bookId, { available: false });
    }
  }
);

export const Borrow = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);
