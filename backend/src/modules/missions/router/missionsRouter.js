import express from 'express';
import { getDailyMissions, updateMissionProgress, claimMission } from '../controller/missionController.js';
import { verifyToken } from '../../../middleware/verifyToken.js';
import {
  validateDailyMissionsRequest,
  validateMissionProgress,
  validateMissionClaim
} from '../../../middleware/inputValidators.js';

const router = express.Router();

// GET /missions/daily/:usuarioId
router.get('/daily/:usuarioId', verifyToken, validateDailyMissionsRequest, getDailyMissions);

// POST /missions/progress
router.post('/progress', verifyToken, validateMissionProgress, updateMissionProgress);

// POST /missions/claim/:missionId
router.post('/claim/:missionId', verifyToken, validateMissionClaim, claimMission);

export default router;
