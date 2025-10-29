import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IEncryptService } from "../../../../domain/src/services/EncryptService";
//estaria listo para cuando descomente los use-cases de mi dom
export class EncryptServiceImpl implements IEncryptService {
  private secret = process.env.JWT_SECRET || "claveSecretaTemporal";

  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed);
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }

  verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      if (typeof decoded === "string") return null;
      return decoded as JwtPayload;
    } catch (err) {
      return null;
    }
  }
}
