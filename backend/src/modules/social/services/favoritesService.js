import * as socialRepository from "../repositories/favoritesRepository.js";
import * as cacheService from "../../../services/cacheService.js";
import { resolveCharacterId } from "../../characters/repositories/characterRepository.js";

/**
 * CONFIGURAÇÃO DE CACHE
 * TTLs em segundos
 */
const CACHE_TTL = {
  USER_FAVORITES: 10 * 60  // 10 minutos - favoritos do usuário
};

// Toggle favorite status for character
// Adds favorite if not exists, removes if already favorited
export const toggleFavoritesService = async (
  usuarioId,
  personagemId
) => {
  const resolvedPersonagemId = await resolveCharacterId(personagemId);

  if (!resolvedPersonagemId) {
    return {
      status: 404,
      error: 'Personagem não encontrado'
    };
  }

  const favoritoExiste =
    await socialRepository.findFavorites(
      usuarioId,
      resolvedPersonagemId
    );

  // If favorite exists, remove it
  if (favoritoExiste) {
    await socialRepository.removeFavorite(
      usuarioId,
      resolvedPersonagemId
    );

    // Invalida cache de favoritos do usuário
    await cacheService.cacheInvalidatePattern(`favorite:user:${usuarioId}:*`);

    return {
      status: 200,
      favorited: false,
      message: 'Favorite removed'
    };
  }

  // Add new favorite
  await socialRepository.addFavorite(
    usuarioId,
    resolvedPersonagemId
  );

  // Invalida cache de favoritos do usuário
  await cacheService.cacheInvalidatePattern(`favorite:user:${usuarioId}:*`);

  return {
    status: 201,
    favorited: true,
    message: 'Favorite added'
  };
};

// =========================
// GET USER FAVORITES (com cache)
// =========================

export const getFavoritesUserService = async (usuarioId, requesterId = null) => {
  const isOwner = Number(requesterId) === Number(usuarioId);
  const privacyFlags = isOwner
    ? null
    : await socialRepository.findUserPrivacyFlags(usuarioId);

  if (!isOwner && privacyFlags?.hide_favorite_character) {
    return [];
  }

  const cacheKey = `favorite:user:${usuarioId}:${isOwner ? 'owner' : 'public'}`;
  
  return await cacheService.cacheWithFallback(
    cacheKey,
    () => socialRepository.findFavoritesUserByUser(usuarioId, isOwner),
    CACHE_TTL.USER_FAVORITES
  );
};