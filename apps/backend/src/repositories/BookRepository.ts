import { BookModel } from "../models/Book";
import { Book } from "../../../../domain/src/entities/Book";

export class BookRepository {
  async findById(id: string): Promise<Book | null> {
    const bookModel = await BookModel.findByPk(id);
    if (!bookModel) return null;

    return Book.fromPersistence({
      id: bookModel.getDataValue("id"),
      title: bookModel.getDataValue("title"),
      author: bookModel.getDataValue("author"),
      publicationYear: bookModel.getDataValue("publicationYear"),
      isTaken: bookModel.getDataValue("isTaken"),
    });
  }

  async save(book: Book): Promise<void> {
    await BookModel.upsert({
      id: book.id,
      title: book.title,
      author: book.author,
      publicationYear: book.publicationYear,
      isTaken: book.isTaken,
    });
  }

  async findAll(): Promise<Book[]> {
    const books = await BookModel.findAll();
    return books.map((b) =>
      Book.fromPersistence({
        id: b.getDataValue("id"),
        title: b.getDataValue("title"),
        author: b.getDataValue("author"),
        publicationYear: b.getDataValue("publicationYear"),
        isTaken: b.getDataValue("isTaken"),
      })
    );
  }

  async updateStatus(id: string, isTaken: boolean): Promise<void> {
    await BookModel.update({ isTaken }, { where: { id } });
  }
}
