import { Router } from 'express';
import { chat, getChatHistory } from '../controllers/chatController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect, authorize('student'));
router.get('/history', getChatHistory);
router.post('/', chat);

export default router;
