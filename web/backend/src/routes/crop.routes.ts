import { Router } from 'express';
import { scanCrop, getScanHistory, createCropPlan } from '../controllers/crop.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/scan', upload.single('image'), scanCrop);
router.get('/history', getScanHistory);
router.post('/plan', createCropPlan);

export default router;

