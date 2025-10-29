import { TakeBookUseCase } from "../src/use-cases/TakeBook";
import { Book } from "../src/entities/Book";
import { User } from "../src/entities/User";

describe("TakeBookUseCase", () => {
  let bookRepo: any;
  let userRepo: any;
  let loanRepo: any;
  let useCase: TakeBookUseCase;

  let readerUser: User;
  let adminUser: User;
  let book: Book;

  beforeEach(() => {
    jest.clearAllMocks();

    bookRepo = { findById: jest.fn(), save: jest.fn() };
    userRepo = { findById: jest.fn() };
    loanRepo = { save: jest.fn() };

    useCase = new TakeBookUseCase(bookRepo, userRepo, loanRepo);

    readerUser = User.create({ id: "u1", name: "Reader", role: "reader", password: "123456" });
    adminUser = User.create({ id: "u2", name: "Admin", role: "admin", password: "123456" });
    book = Book.create({ id: "b1", title: "Libro 1", author: "Autor 1", publicationYear: 2023 });
  });

  it("debería permitir préstamo si el usuario es reader", async () => {
    userRepo.findById.mockResolvedValue(readerUser);
    bookRepo.findById.mockResolvedValue(book);

    await useCase.execute(readerUser.id, book.id);

    expect(book.isTaken).toBe(true);
    expect(bookRepo.save).toHaveBeenCalledWith(book);
    expect(loanRepo.save).toHaveBeenCalled();
  });

  it("debería denegar préstamo si el usuario no es reader", async () => {
    userRepo.findById.mockResolvedValue(adminUser);
    bookRepo.findById.mockResolvedValue(book);

    await expect(useCase.execute(adminUser.id, book.id)).rejects.toThrow(
      "Debe ser un lector para tomar un libro."
    );

    expect(bookRepo.save).not.toHaveBeenCalled();
    expect(loanRepo.save).not.toHaveBeenCalled();
  });
});
