// domain/src/index.ts
export * from "./entities/Book";
export * from "./entities/User";
export * from "./entities/Loan";

export * from "./services/BookRepository";
export * from "./services/UserRepository";
export * from "./services/LoanRepository";

export * from "./use-cases/AddBook";
export * from "./use-cases/TakeBook";
export * from "./use-cases/ReturnBook";
export * from "./use-cases/RegisterUser";
