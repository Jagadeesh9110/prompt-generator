import express from 'express';
import * as multiModelOptimizerController from '../controllers/multiModelOptimizerController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.post('/run', multiModelOptimizerController.runOptimization);
router.get('/:id', multiModelOptimizerController.getOptimization);

export default router;
