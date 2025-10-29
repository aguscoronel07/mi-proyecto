import { AddBookUseCase } from "../src/use-cases/AddBook";
import { Book } from "../src/entities/Book";
import { User } from "../src/entities/User";
import { IBookRepository } from "../src/services/BookRepository";
import { IUserRepository } from "../src/services/UserRepository";



// aca verifico que solo los admin puedan agregar libros 

describe("AddBookUseCase", () => {
  let bookRepo: jest.Mocked<IBookRepository>;
  let userRepo: jest.Mocked<IUserRepository>;
  let useCase: AddBookUseCase;

  let adminUser: User;
  let readerUser: User;

  beforeEach(() => {
    bookRepo = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
    } as jest.Mocked<IBookRepository>;

    userRepo = {
      findById: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<IUserRepository>;

    useCase = new AddBookUseCase(bookRepo, userRepo);

    adminUser = User.create({
      id: "admin1",
      name: "Admin",
      role: "admin",
      password: "123456",
    });

    readerUser = User.create({
      id: "reader1",
      name: "Reader",
      role: "reader",
      password: "123456",
    });
  });

  it("debería permitir agregar un libro si el usuario es admin", async () => {
    userRepo.findById.mockResolvedValue(adminUser);

    const data = { title: "Libro A", author: "Autor A", year: 2023 };
    await useCase.execute(adminUser.id, data);

    expect(bookRepo.save).toHaveBeenCalledTimes(1);
    const savedBook = bookRepo.save.mock.calls[0]![0] as Book;
    expect(savedBook.title).toBe("Libro A");
    expect(savedBook.author).toBe("Autor A");
    expect(savedBook.publicationYear).toBe(2023);
  });

  it("debería denegar agregar libro si el usuario no es admin", async () => {
    userRepo.findById.mockResolvedValue(readerUser);

    const data = { title: "Libro B", author: "Autor B", year: 2023 };
    await expect(useCase.execute(readerUser.id, data)).rejects.toThrow(
      "Solo los administradores pueden agregar libros"
    );

    expect(bookRepo.save).not.toHaveBeenCalled();
  });
});
