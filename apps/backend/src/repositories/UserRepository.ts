import { IUserRepository } from "../../../../domain/src/services/UserRepository";
import { User } from "../../../../domain/src/entities/User";

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}
