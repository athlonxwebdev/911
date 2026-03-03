import { Router } from 'express';
import { createAnnouncement, getAnnouncements } from '../controllers/announcementController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getAnnouncements);
router.post('/', protect, authorize('admin'), createAnnouncement);

export default router;
