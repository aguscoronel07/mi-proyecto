import { IBookRepository } from "../services/BookRepository";
import { IUserRepository } from "../services/UserRepository";
import { Book } from "../entities/Book";

export class AddBookUseCase {
  constructor(
    private bookRepository: IBookRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(
    userId: string,
    data: { title: string; author: string; year: number }
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (user.role !== "admin")
      throw new Error("Solo los administradores pueden agregar libros");

    const newBook = Book.create({
      id: crypto.randomUUID(),
      title: data.title,
      author: data.author,
      publicationYear: data.year,
    });

    await this.bookRepository.save(newBook);
  }
}
