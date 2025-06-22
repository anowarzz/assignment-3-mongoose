import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

// Book Schema Using Mongoose
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title is required"]},
    author: { type: String, required: [true, "Author is required"] },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
      message: `Genre must be one of the following: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY , got {VALUE}`,
    },
    isbn: { type: String, required: [true, "ISBN is required"], unique: [true, "ISBN must be unique"] },
    description: { type: String, trim: true },
    copies: { type: Number, min: [0, "Copies must be a positive number"] },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);


// pre save hook to set the availability false if copies = 0
bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

export const Book = model<IBook>("Book", bookSchema);
