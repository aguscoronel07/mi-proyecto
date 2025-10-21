import { Request, Response } from "express";
import { AddBookUseCase } from "../../../../domain/src/use-cases/AddBook";
import { TakeBookUseCase } from "../../../../domain/src/use-cases/TakeBook";
import { ReturnBookUseCase } from "../../../../domain/src/use-cases/ReturnBook";
import { userRepo, bookRepo } from "../repositories";
import { LoanRepository } from "../repositories/LoanRepository";


const loanRepo = new LoanRepository();

const addBookUseCase = new AddBookUseCase(bookRepo, userRepo);
const takeBookUseCase = new TakeBookUseCase(bookRepo, userRepo, loanRepo);
const returnBookUseCase = new ReturnBookUseCase(bookRepo, userRepo, loanRepo);


export class BookController {
  async getAll(req: Request, res: Response) {
    try {
      const books = await bookRepo.findAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los libros", error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { userId, title, author, year } = req.body;
      if (!userId || !title || !author || !year) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      await addBookUseCase.execute(userId, { title, author, year });
      res.status(201).json({ message: "Libro agregado correctamente" });

    
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al crear el libro", error });
    }
  }

  async borrow(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { id } = req.params;
      if (!id || !userId) return res.status(400).json({ message: "Faltan datos" });

      await takeBookUseCase.execute(userId, id);
      res.json({ message: "Libro prestado correctamente" });

      // NOTA: luego reemplazar el envío de userId por un middleware JWT
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al prestar el libro", error });
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { id } = req.params;
      if (!id || !userId) return res.status(400).json({ message: "Faltan datos" });

      await returnBookUseCase.execute(userId, id);
      res.json({ message: "Libro devuelto correctamente" });

      //  luego reemplazar tengo que cambiar el envío del userId por un middleware del token
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al devolver el libro", error });
    }
  }
}
