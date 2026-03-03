import { Router } from 'express';
import { createIntent, listIntents, updateIntent } from '../controllers/intentController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.use(protect, authorize('admin'));
router.get('/', listIntents);
router.post('/', createIntent);
router.put('/:id', updateIntent);

export default router;
