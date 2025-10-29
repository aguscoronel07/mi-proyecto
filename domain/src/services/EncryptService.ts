export interface IEncryptService {
  hash(password: string): Promise<string>;
  compare(password: string, hashed: string): Promise<boolean>;
  generateToken(payload: object): string;
  verifyToken(token: string): any;
}