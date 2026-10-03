import { Router } from 'express';
import * as ratingsController from '../controllers/ratingsController.js';
import { verifyToken } from '../../../middleware/verifyToken.js';
import {
  validateRatingsCategoryRequest,
  validateRatingsCharacterId
} from '../../../middleware/inputValidators.js';

const router = Router();

router.get('/tags', ratingsController.getTags);

router.get('/characters/:slug', validateRatingsCategoryRequest, ratingsController.getCharactersByCategory);

router.post(
  '/reclassify/:characterId',
  verifyToken,
  validateRatingsCharacterId,
  ratingsController.reclassifyCharacter
);

export default router;