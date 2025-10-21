import { ILoanRepository } from "../../../../domain/src/services/LoanRepository";
import { Loan } from "../../../../domain/src/entities/Loan";

export class LoanRepository implements ILoanRepository {
  private loans: Loan[] = [];

  async findByBookId(bookId: string): Promise<Loan | null> {
    return this.loans.find(l => l.book.id === bookId) || null;
  }

  async findByUserId(userId: string): Promise<Loan[]> {
    return this.loans.filter(l => l.user.id === userId);
  }

  async findAll(): Promise<Loan[]> {
    return this.loans;
  }

  async save(loan: Loan): Promise<void> {
    this.loans.push(loan);
  }

  async remove(loan: Loan): Promise<void> {
    this.loans = this.loans.filter(l => l !== loan);
  }
}
