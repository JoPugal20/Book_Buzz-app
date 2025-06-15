// backend/controllers/book.controller.js
import Book from "../models/book.model.js";
import cloudinary from "../utils/cloudinary.js";

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Extract public_id from URL
    const urlParts = book.image.split("/");
    const filename = urlParts[urlParts.length - 1]; // e.g. book123.jpg
    const publicId = filename.split(".")[0]; // e.g. book123

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete book from MongoDB
    await book.deleteOne();

    res.status(200).json({ message: "Book and image deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};
