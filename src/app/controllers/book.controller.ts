import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";


export const bookRoutes = express.Router();

// Zod Schema for Book Validation
const CreateBookZodSchema = z.object({
    title: z.string(),
    author: z.string(),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
    isbn: z.string(),
    description: z.string().optional(),
    copies: z.number().nonnegative(),
    available: z.boolean().optional()
});

// Create Book
bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        //const validatedBody = await CreateBookZodSchema.parseAsync(req.body);
        const validatedBody = req.body
        const book = await Book.create(validatedBody);

        const bookObj = book.toObject();
        const reorderedBook = {
            _id: bookObj._id,
            title: bookObj.title,
            author: bookObj.author,
            genre: bookObj.genre,
            isbn: bookObj.isbn,
            description: bookObj.description,
            copies: bookObj.copies,
            available: bookObj.available,
            createdAt: bookObj.createdAt,
            updatedAt: bookObj.updatedAt,
        };


        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: reorderedBook
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        });
    }
});

// Get All Books (Optional: You can add filtering later)
bookRoutes.get('/', async (_req: Request, res: Response) => {
    const books = await Book.find();

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
});




// // Get Book by ID
// bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
//   try {
//     const book = await Book.findById(req.params.bookId);

//     if (!book) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Book retrieved successfully",
//       data: book
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Invalid book ID",
//       error
//     });
//   }
// });

// // Update Book
// bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
//   try {
//     const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });

//     if (!updatedBook) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Book updated successfully",
//       data: updatedBook
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Book update failed",
//       error
//     });
//   }
// });

// // Delete Book
// bookRoutes.delete('/:bookId', async (req: Request, res: Response) => {
//   try {
//     const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

//     if (!deletedBook) {
//       return res.status(404).json({
//         success: false,
//         message: "Book not found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Book deleted successfully",
//       data: null
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Book deletion failed",
//       error
//     });
//   }
// });
