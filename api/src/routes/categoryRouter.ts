import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

router.get('/', CategoryController.getCategories);
router.post('/', CategoryController.createCategory);
router.get('/:id', CategoryController.getCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

export default router;