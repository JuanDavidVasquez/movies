import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser.bind(UserController));
router.get('/:id', UserController.getUser.bind(UserController));
router.put('/:id', UserController.updateUser.bind(UserController));
router.delete('/:id', UserController.deleteUser.bind(UserController));

export default router;