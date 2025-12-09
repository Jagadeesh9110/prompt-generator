import express from 'express';
import { compile } from '../controllers/promptController';

const router = express.Router();

router.post('/compile', compile);

export default router;
