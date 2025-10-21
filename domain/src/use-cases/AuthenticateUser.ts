//despues lo implemento para consumirlo en el back

// import { EncryptService } from "../services/EncryptService";

// export class AuthenticateUser {
//   private encryptService = new EncryptService();

//   async execute(username: string, password: string, storedHash: string) {
//     const match = await this.encryptService.compare(password, storedHash);

//     if (!match) throw new Error("Credenciales incorrectas");

//     // Genero el token si coincide
//     const token = this.encryptService.generateToken({
//       username,
//       role: "usuario",
//     });

//     return token;
//   }
// }
