import { Router } from 'express';
import authRoutes from './auth.routes';
import cropRoutes from './crop.routes';
import marketRoutes from './market.routes';
import weatherRoutes from './weather.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/crop', cropRoutes);
router.use('/market', marketRoutes);
router.use('/weather', weatherRoutes);

export default router;

