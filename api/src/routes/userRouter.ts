import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

// Crear usuario (público, no requiere autenticación)
router.post("/", UserController.createUser.bind(UserController));

// Rutas protegidas
router.get("/", authenticateToken, UserController.getUsers);
router.get("/:id", authenticateToken, UserController.getUser.bind(UserController));
router.put("/:id", authenticateToken, UserController.updateUser.bind(UserController));
router.delete("/:id", authenticateToken, UserController.deleteUser.bind(UserController));

export default router;
