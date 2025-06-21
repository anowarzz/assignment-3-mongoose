import { model, Schema, Types } from "mongoose";
import { Book } from "../Book/book.model";
import { BorrowStaticMethods, IBorrow } from "./borrow.interface";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "You have to borrow at least 1 copy"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
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

//  pre save hook to minus book copies
borrowSchema.pre("save", async function (next) {
  try {
    const book = await Book.findById(this.book);
    if (!book) {
      throw new Error("Book not found");
    }

    if (book.copies < this.quantity) {
      throw new Error(
        `Cannot borrow ${this.quantity} pcs. Only ${book.copies} pcs available`
      );
    }

    book.copies -= this.quantity;
    await book.save();
    next();
  } catch (error: any) {
    next(error);
  }
});

// post save hook console log
borrowSchema.post("save", async function (doc) {
  console.log(`Book ${doc.book} borrowed successfully - Qty: ${doc.quantity}`);
});

export const Borrow = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);
