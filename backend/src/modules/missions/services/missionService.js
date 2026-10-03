import * as repo from '../repositories/missionRepository.js';

export function getDailyMissionsService(usuarioId) {
  return repo.getDailyMissions(usuarioId);
}

export function updateMissionProgressService(usuarioId, missionId, incremento = 1) {
  const res = repo.incrementMissionProgress(usuarioId, missionId, incremento);
  if (!res) {
    const error = new Error('Mission not found');
    error.status = 404;
    error.code = 'MISSION_NOT_FOUND';
    throw error;
  }
  return res;
}

export function claimMissionService(usuarioId, missionId) {
  const res = repo.claimMission(usuarioId, missionId);
  if (res.error) {
    const err = new Error(res.error);
    const isMissing = res.error === 'Mission not found';
    err.status = isMissing ? 404 : 409;
    err.code = isMissing
      ? 'MISSION_NOT_FOUND'
      : res.error === 'Already claimed'
        ? 'MISSION_ALREADY_CLAIMED'
        : 'MISSION_NOT_COMPLETED';
    throw err;
  }
  return res;
}
