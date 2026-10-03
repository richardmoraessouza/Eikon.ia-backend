import { Router } from 'express';
import { getPopularWeek, getFeed } from '../controllers/discoveryController.js';
import { validateDiscoveryRequest } from '../../../middleware/inputValidators.js';

const router = Router();

router.get('/popular-week', getPopularWeek);

router.get('/recommendations/:usuarioId', validateDiscoveryRequest, getFeed);

export default router;