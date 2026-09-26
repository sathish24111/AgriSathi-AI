import { Router } from 'express';
import { getMarketRates } from '../controllers/market.controller';

const router = Router();

router.get('/rates', getMarketRates);

export default router;

