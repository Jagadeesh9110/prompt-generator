import express from 'express';
import { classify } from '../controllers/intentClassifierController';
import { protect } from '../middleware/auth';

const router = express.Router();

// POST /api/intent/classify
// Protected route (requires JWT)
router.post('/classify', protect, classify);

export default router;
