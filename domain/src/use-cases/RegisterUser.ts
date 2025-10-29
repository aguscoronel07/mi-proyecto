//LUEGO DEBO INYECTAR AL BACK ESTE CODIGO


// import { IUserRepository } from "../services/UserRepository";
// import { IEncryptService } from "../services/EncryptService";
// import { User } from "../entities/User";

// export class RegisterUserUseCase {
//   constructor(
//     private userRepository: IUserRepository,
//     private encryptService: IEncryptService
//   ) {}

//   async execute(data: { id: string; name: string; role: "reader" | "admin"; password: string }): Promise<void> {
//     const existingUser = await this.userRepository.findById(data.id);
//     if (existingUser) throw new Error("El usuario ya está registrado");

//     const hashedPassword = await this.encryptService.hash(data.password);

//     const newUser = User.create({
//       id: data.id,
//       name: data.name,
//       role: data.role,
//       password: hashedPassword,
//     });

//     await this.userRepository.save(newUser);
//   }
// }
