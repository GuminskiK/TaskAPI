import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createNewTask);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTaskDetails);
router.delete('/:id', taskController.removeTask);

export default router;
