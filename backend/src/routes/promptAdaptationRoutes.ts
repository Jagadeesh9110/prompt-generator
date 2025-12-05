import express from 'express';
import * as promptAdaptationController from '../controllers/promptAdaptationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.post('/build', promptAdaptationController.buildBasePrompt);
router.get('/:id', promptAdaptationController.getAdaptedPrompt);

export default router;
