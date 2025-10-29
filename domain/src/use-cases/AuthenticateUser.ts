//LUEGO DEBO INYECTAR AL BACK ESTE CODIGO

// import { IUserRepository } from "../services/UserRepository";
// import { IEncryptService } from "../services/EncryptService";

// export class AuthenticateUserUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private encryptService: IEncryptService
//   ) {}

//   async execute(userId: string, password: string): Promise<string> {
//     const user = await this.userRepository.findById(userId);
//     if (!user) throw new Error("Usuario no encontrado");

//     const match = await this.encryptService.compare(password, user.password);
//     if (!match) throw new Error("Credenciales incorrectas");

//     return this.encryptService.generateToken({
//       userId: user.id,
//       role: user.role,
//     });
//   }
// }
