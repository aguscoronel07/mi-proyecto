import { ReturnBookUseCase } from "../src/use-cases/ReturnBook";
import { Book } from "../src/entities/Book";
import { User } from "../src/entities/User";
import { Loan } from "../src/entities/Loan";

describe("ReturnBookUseCase", () => {
  let bookRepo: any;
  let userRepo: any;
  let loanRepo: any;
  let useCase: ReturnBookUseCase;

  let user: User;
  let book: Book;
  let loan: Loan;

  beforeEach(() => {
    jest.clearAllMocks();

    bookRepo = { findById: jest.fn(), save: jest.fn() };
    userRepo = { findById: jest.fn() };
    loanRepo = { findByBookId: jest.fn(), save: jest.fn() };

    useCase = new ReturnBookUseCase(bookRepo, userRepo, loanRepo);

    user = User.create({ id: "u1", name: "Pepito", role: "reader", password: "123456" });
    book = Book.create({ id: "b1", title: "Libro X", author: "Autor Y", publicationYear: 2023 });
    book.markAsBorrowed();
    loan = new Loan(user, book);
  });

  it("debería completar devolución exitosamente", async () => {
    userRepo.findById.mockResolvedValue(user);
    bookRepo.findById.mockResolvedValue(book);
    loanRepo.findByBookId.mockResolvedValue(loan);

    await useCase.execute(user.id, book.id);

    expect(book.isTaken).toBe(false);
    expect(loan.returnDate).toBeInstanceOf(Date);
    expect(bookRepo.save).toHaveBeenCalledWith(book);
    expect(loanRepo.save).toHaveBeenCalledWith(loan);
  });

  it("debería lanzar error si libro no estaba prestado", async () => {
    const libre = Book.create({ id: "b2", title: "Libro Y", author: "Autor Z", publicationYear: 2023 });
    bookRepo.findById.mockResolvedValue(libre);
    userRepo.findById.mockResolvedValue(user);

    await expect(useCase.execute(user.id, libre.id)).rejects.toThrow(
      "El libro no fue prestado, no se puede devolver"
    );
  });
});
