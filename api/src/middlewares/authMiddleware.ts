import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any; // Puedes definir mejor el tipo de usuario según tu modelo
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided.", status: "error" });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Agrega el usuario decodificado al request
    next(); // Llama a `next` sin devolver una respuesta
  } catch (error) {
    res.status(403).json({ message: "Invalid token.", status: "error" });
  }
};
