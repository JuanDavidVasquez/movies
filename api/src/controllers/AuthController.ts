import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar que email y password estén presentes
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', status: 'error' });
      }

      // Buscar usuario por email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password', status: 'error' });
      }

      // Verificar contraseña
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid email or password', status: 'error' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string, 
        { expiresIn: "1m" }
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user.id, email: user.email },
        status: 'success',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', status: 'error' });
    }
  }
}
