import { IBookRepository } from "../services/BookRepository";
import { IUserRepository } from "../services/UserRepository";
import { ILoanRepository } from "../services/LoanRepository";

export class ReturnBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private userRepository: IUserRepository,
    private loanRepository: ILoanRepository
  ) {}

  async execute(userId: string, bookId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('No es un usuario');


    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error ('No existe el libro')

    if (!book.isTaken) throw new Error('El libro no fue prestado, no se puede devolver')
    

    const loan = await this.loanRepository.findByBookId(bookId);
    if (!loan || loan.user.id !== userId) {
      throw new Error('Este usuario no tiene este libro prestado');
    }

    book.markAsReturned();
    await this.bookRepository.save(book);

    loan.returnDate = new Date();
    await this.loanRepository.save(loan);
}

}
