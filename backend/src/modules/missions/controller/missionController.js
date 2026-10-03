import { getDailyMissionsService, updateMissionProgressService, claimMissionService } from '../services/missionService.js';

export async function getDailyMissions(req, res, next) {
  try {
    const { usuarioId } = req.params;
    if (Number(req.user?.id) !== Number(usuarioId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const data = getDailyMissionsService(usuarioId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function updateMissionProgress(req, res, next) {
  try {
    const { usuarioId, missionId, incremento } = req.body;
    if (Number(req.user?.id) !== Number(usuarioId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const data = updateMissionProgressService(usuarioId, missionId, incremento);
    return res.json(data);
  } catch (err) {
    next(err);
  }
}

export async function claimMission(req, res, next) {
  try {
    const { missionId } = req.params;
    const data = claimMissionService(req.user.id, missionId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
}
