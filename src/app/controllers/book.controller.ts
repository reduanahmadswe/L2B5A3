import express, { NextFunction, Request, Response } from "express";
import { Book } from "../models/book.model";
import { z } from "zod";
import APIFunctionality from "../../utils/apiFunctionality";

import { errorHandler  } from './../../utils/errorHandler';

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
bookRoutes.post('/', async (req: Request, res: Response,next:NextFunction):Promise<any> => {
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
      return errorHandler(error, req, res, next);
    }
});

//Get All Books
bookRoutes.get('/', async (req: Request, res: Response,next : NextFunction): Promise<void> => {
    try {
        const limit = Number(req.query.limit) || 10;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "desc" ? -1 : 1;
        const page = Number(req.query.page) || 1;


        const apiFeatures = new APIFunctionality(Book.find(), req.query)
            .filter();


        const filteredQuery = apiFeatures.query.clone();
        const bookCount = await filteredQuery.countDocuments();


        const totalPages = Math.ceil(bookCount / limit);

        if (page > totalPages && bookCount > 0) {
            res.status(404).json({
                success: false,
                message: "This page does not exist"
            });
            return;
        }


        apiFeatures.query = apiFeatures.query.sort({ [sortBy as string]: sortOrder });

        apiFeatures.pagination(limit);
        const books = await apiFeatures.query;

        if (!books || books.length === 0) {
            res.status(404).json({
                success: false,
                message: "No books found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });

    } catch (error) {
        next(error);
    }
});

// bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
//     const { bookId } = req.params;

//     const book = await Book.findById(bookId);

//     res.status(200).json({
//         success: true,
//         message: "Book retrieved successfully",
//         data: book
//     });

// })

//Get Book by ID
bookRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book
    });

  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to retrieve book",
    //   error: (error as Error).message
    // });
    next(error);
  }
});


//Update Book
bookRoutes.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook
    });

  } catch (error) {
    next(error);
  }
});

//delete book
bookRoutes.delete('/:bookId', async (req: Request, res: Response,next: NextFunction) => {
  try {
    const { bookId } = req.params;
    

    const deletedBook = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null
    });

  } catch (error) {
    next(error);
  }
});
