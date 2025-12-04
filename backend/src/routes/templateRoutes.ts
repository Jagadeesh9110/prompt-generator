import express from 'express';
import * as templateController from '../controllers/templateController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Apply auth middleware to all routes? Or just write operations?
// For now, let's protect everything.
router.use(protect);

router.post('/', templateController.createTemplate);
router.get('/', templateController.getAllTemplates); // Requires ?category=...
router.get('/:id', templateController.getTemplateById);
router.get('/category/:category', templateController.getTemplatesByCategory);
router.get('/category/:category/:subcase', templateController.getTemplateBySubcase);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

export default router;
