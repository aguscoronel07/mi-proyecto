import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../../../domain/src/entities/User";
import { userRepo, bookRepo } from "../repositories";

///
//TODAVIA TENGO QUE ADAPTAR UserController para que inyecte las reglas de mi dominio, por eso las dos estan comentadas
///

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no está configurada.");
}
const SECRET_KEY = process.env.JWT_SECRET;

export class UserController {
  async register(req: Request, res: Response) {
    try {
      const { id, name, role, password } = req.body;

      if (!id || !name || !role || !password) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const existing = await userRepo.findById(id);
      if (existing) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = User.create({
        id,
        name,
        role,
        password: hashedPassword,
      });

      await userRepo.save(user);

      res.status(201).json({ 
        message: "Usuario registrado", 
        user: { id: user.id, name: user.name, role: user.role } 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { id, password } = req.body;

      if (!id || !password) {
        return res.status(400).json({ message: "Faltan datos" });
      }

      const user = await userRepo.findById(id);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.json({ message: "Login exitoso", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al iniciar sesión" });
    }
  }
}
