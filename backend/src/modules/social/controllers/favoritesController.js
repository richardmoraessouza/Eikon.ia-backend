import * as socialService from "../services/favoritesService.js";
import { updateTagScore } from '../../discovery/repositories/discoveryRepository.js';

// =========================
// TOGGLE FAVORITE - Add or remove favorite
// Uses JWT token for authentication
// =========================
export const toggleFavorites = async (req, res) => {
  const usuarioId = Number(req.user.id);
  const { personagem_id } = req.params;

  try {
    const result = await socialService.toggleFavoritesService(
      usuarioId,
      personagem_id
    );

    if (result.favorited) {
      await updateTagScore(usuarioId, personagem_id, 'favorite');
    }

    return res.status(result.status).json(result);

  } catch (err) {
    console.error("Error favoriting:", err);

    return res.status(500).json({
      error: "Error toggling favorite"
    });
  }
};

// =========================
// GET USER FAVORITES - Retrieve user's favorite list (public, read-only)
// =========================
export const getFavoritesUser = async (req, res) => {
  const idParam = req.params.usuarioId || req.params.usuario_id;
  const usuarioIdNum = Number(idParam);

  if (!idParam || !Number.isInteger(usuarioIdNum) || usuarioIdNum < 1) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const requesterId = req.user?.id ? Number(req.user.id) : null;
    const favoritos = await socialService.getFavoritesUserService(usuarioIdNum, requesterId);
    return res.status(200).json(favoritos);
  } catch (error) {
    console.error('Error searching for favorites:', error);
    return res.status(500).json({ error: 'Error searching for favorites' });
  }
};