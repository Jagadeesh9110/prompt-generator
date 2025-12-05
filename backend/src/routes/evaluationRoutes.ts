import express from 'express';
import * as evaluationController from '../controllers/evaluationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.post('/run', evaluationController.evaluatePrompt);

export default router;
