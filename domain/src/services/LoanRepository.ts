import { Loan } from "../entities/Loan";

export interface ILoanRepository {
  save(loan: Loan): Promise<void>;
  findByUserId(userId: string): Promise<Loan[]>;
  findByBookId(bookId: string): Promise<Loan | null>;
  findAll(): Promise<Loan[]>;
}
