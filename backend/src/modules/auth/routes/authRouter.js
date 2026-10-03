import express from 'express';
import { verifyToken } from '../../../middleware/verifyToken.js';
import { optionalVerifyToken } from '../../../middleware/optionalVerifyToken.js';
import { authLimiter } from '../../../middleware/rateLimiter.js';
import {
  validateRegister,
  validateLogin,
  validateEmailParam
} from '../../../middleware/inputValidators.js';

import {
  addUser,
  loginUser,
  checkEmailAvailability,
  logoutUser,
  getCurrentUser
} from '../controllers/authController.js';

const router = express.Router();

// REGISTER - Create new user account
router.post('/register', authLimiter, validateRegister, addUser);

// LOGIN - Authenticate user with Google
router.post('/login', authLimiter, validateLogin, loginUser);

// LOGOUT & SESSION
router.post('/logout', optionalVerifyToken, logoutUser);
router.get('/me', verifyToken, getCurrentUser);

// SEARCH BY EMAIL - Get user public data
router.get('/check-email/:gmail', authLimiter, validateEmailParam, checkEmailAvailability);

export default router;