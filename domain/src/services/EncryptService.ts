import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface IEncryptService {
  hash(password: string): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
  generateToken(payload: object): string;
  verifyToken(token: string): JwtPayload | null;
}

export class EncryptService implements IEncryptService {
  private secret = process.env.JWT_SECRET || "claveSecretaTemporal";

  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret);

      // no debería pasar
      if (typeof decoded === "string") {
        return null;
      }

      return decoded as JwtPayload;
    } catch (err) {
      return null;
    }
  }
}
