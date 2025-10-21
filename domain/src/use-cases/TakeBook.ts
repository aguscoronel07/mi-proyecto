import {IBookRepository} from "../services/BookRepository";
import {IUserRepository} from "../services/UserRepository";
import { ILoanRepository } from "../services/LoanRepository";
import { Loan } from "../entities/Loan";

export class TakeBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private userRepository: IUserRepository,
    private loanRepository: ILoanRepository

  ) {}

  async execute(userId: string, bookId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');

    if (user.role != 'reader') throw new Error('Debe ser un lector para tomar un libro.');

    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error ('El libro buscado no existe');

    book.markAsBorrowed();
    await this.bookRepository.save(book);

    const loan = new Loan(user, book);
    await this.loanRepository.save(loan)

  }

}