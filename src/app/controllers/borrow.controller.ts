import express, { NextFunction, Request, Response } from 'express';
import { Borrow } from '../models/borrow.model';
import { Book } from '../models/book.model';
import { BookDocument, IBook } from '../interfaces/book.interfaces';


export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response ,next: NextFunction) : Promise<any>=> {
    try {
        const { book, quantity, dueDate } = req.body;
        const bookDoc = await Book.findById(book) as BookDocument;
        if (!bookDoc || bookDoc.copies < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Not enough copies available'
            });
        }
        bookDoc.copies -= quantity;
        bookDoc.updateAvailability();
        await bookDoc.save();
        const borrow = await Borrow.create({ book, quantity, dueDate });
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Borrowing failed', error });
    }
});

borrowRoutes.get("/", async (_req: Request, res: Response) => {
    const result = await Borrow.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'bookDetails'
            }
        },
        { $unwind: '$bookDetails' },
        {
            $project: {
                book: {
                    title: '$bookDetails.title',
                    isbn: '$bookDetails.isbn'
                },
                totalQuantity: 1
            }
        }
    ]);
    res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: result });
});
