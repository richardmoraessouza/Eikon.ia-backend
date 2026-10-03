import { Router } from "express";
import { getFavoritesUser, toggleFavorites } from "../controllers/favoritesController.js";
import { toggleLike, getLikesCount, getLikesByUsuario } from "../controllers/likeController.js";
import { followUser, unfollowUser, listFollowers, listFollowing } from "../controllers/followersController.js";
import { verifyToken } from "../../../middleware/verifyToken.js";
import { optionalVerifyToken } from "../../../middleware/optionalVerifyToken.js";
import { socialLimiter } from "../../../middleware/rateLimiter.js";
import { 
  validateSocialAction, 
  validatePersonagemId, 
  validateUsuarioIdParam,
  validateIdParam,
  validateFollowTarget
} from "../../../middleware/inputValidators.js";

const router = Router();

// Apply rate limiter to all POST/DELETE routes
router.use(socialLimiter);

// Route to toggle favorite (add or remove)
router.post('/favorites/:usuario_id/:personagem_id', verifyToken, validateSocialAction, ensureTargetUserMatches, toggleFavorites);

// Route to list user's favorite characters
router.get('/favorites-by-user/:usuario_id', optionalVerifyToken, validateUsuarioIdParam, getFavoritesUser);

// Route to toggle like (add or remove)
router.post('/toggle-like/:usuario_id/:personagem_id', verifyToken, validateSocialAction, ensureTargetUserMatches, toggleLike);

// Route to show the quantity of likes for a character
router.get('/likes-quantity/:personagem_id', validatePersonagemId, getLikesCount);

// Route to show likes that the user has given (requires authentication)
router.get('/likes-by-user/:usuario_id', verifyToken, validateUsuarioIdParam, ensureTargetUserMatches, getLikesByUsuario);

// Route to follow a user
router.post('/follow', verifyToken, validateFollowTarget, followUser);

// Route to unfollow a user
router.delete('/unfollow', verifyToken, validateFollowTarget, unfollowUser);

// Route to list followers
router.get('/users/:id/followers', validateIdParam, listFollowers);

// Route to list following users
router.get('/users/:id/following', validateIdParam, listFollowing);

function ensureTargetUserMatches(req, res, next) {
  if (Number(req.params.usuario_id) !== Number(req.user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  return next();
}

export default router;