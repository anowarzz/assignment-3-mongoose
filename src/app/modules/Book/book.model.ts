import { model, Schema } from "mongoose";
import { IBook } from "./book.interface";

// Book Schema Using Mongoose
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
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
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, min: 0 },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
