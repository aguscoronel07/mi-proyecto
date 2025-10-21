import { Book } from "./Book";
import { User } from "./User";

export class Loan {
  constructor(
    public user: User,
    public book: Book,
    public loanDate: Date = new Date(),
    public returnDate?: Date
  ) {}
}
