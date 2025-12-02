import Book from "../models/book.js";

export const createBook = async (req, res) => {         // CREATE BOOK
  try {
    const { title, author, description, price, genre } = req.body;

    // Validate required fields
    if (!title || !author || !price || !genre) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      description: description || "No description provided",
      price,
      genre,
    });

    await newBook.save();

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error.message,
    });
  }
};


// GET ALL BOOKS

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET BOOK BY ID

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// UPDATE BOOK

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, price, genre, inStock } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.description = description ?? book.description;
    book.price = price ?? book.price;
    book.genre = genre ?? book.genre;
    if (inStock !== undefined) book.inStock = inStock;

    await book.save();

    res.json({
      success: true,
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE BOOK

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
