import { Request, Response } from "express";
import bcrypt from "bcryptjs"; // ✅ Usa bcryptjs
import User from "../models/User";

export class UserController {
  // Obtener todos los usuarios
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email"],
      });

      res.status(200).json({
        message: "Users fetched",
        users,
        status: "success",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
  }

  // Crear usuario con email y encriptación de contraseña
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Verificar si el email ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered", status: "error" });
      }

      // ✅ No es necesario encriptar la contraseña aquí, el modelo lo hace automáticamente
      const user = await User.create({ name, email, password });

      res.status(201).json({
        message: "User created",
        user: { id: user.id, name: user.name, email: user.email },
        status: "success",
      });
    } catch (error: any) {
      console.error("Error creating user:", error);
      const errorMessage = error?.errors?.[0]?.message || "Internal Server Error";
      res.status(500).json({ message: errorMessage, status: "error" });
    }
  }

  // Obtener usuario por ID
  static async getUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "name", "email"],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found", status: "error" });
      }

      res.status(200).json({
        message: "User fetched",
        user,
        status: "success",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
  }

  // Actualizar usuario (nombre y/o contraseña)
  static async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found", status: "error" });

      const { name, password } = req.body;

      const updateData: Partial<User> = {};
      if (name) updateData.name = name;
      if (password) updateData.password = password; // ❌ No encriptar aquí, Sequelize lo hará

      await user.update(updateData);

      res.status(200).json({
        message: "User updated",
        user: { id: user.id, name: user.name, email: user.email },
        status: "success",
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
      const errorMessage = error?.errors?.[0]?.message || "Internal Server Error";
      res.status(500).json({ message: errorMessage, status: "error" });
    }
  }

  // Eliminar usuario
  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found", status: "error" });

      await user.destroy();
      res.status(200).json({
        message: "User deleted",
        status: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal Server Error", status: "error" });
    }
  }
}
