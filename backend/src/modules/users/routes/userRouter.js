import { Router } from "express";
import { getUserById, getNameUser, getOtherUser, 
        editProfile, getNameOtherUser, getDataMiniProfile, updateFrame,
        getLevelUser, getFrameUnlocks,
        getXpUser
       } from "../controllers/userController.js";
import { verifyToken } from "../../../middleware/verifyToken.js";
import { validateUserIdParam, validateUsuarioId } from "../../../middleware/inputValidators.js";

const router = Router();

router.get("/user/:id", verifyToken, validateUserIdParam, getUserById);
router.get('/name-user/:id', validateUserIdParam, getNameUser);
router.get('/other-user/:id', getOtherUser);
router.put('/edit-profile/:usuarioId', verifyToken, validateUsuarioId, editProfile);
router.get('/name-other-user/:usuarioId', validateUsuarioId, getNameOtherUser);
router.get('/mini-profile/:usuarioId', validateUsuarioId, getDataMiniProfile);
router.put('/update-frame/:usuarioId', verifyToken, validateUsuarioId, updateFrame);
router.get('/level-user/:usuarioId', verifyToken, validateUsuarioId, getLevelUser);
router.get('/frame-unlocks/:usuarioId', verifyToken, validateUsuarioId, getFrameUnlocks);
router.get('/xp-user/:usuarioId', verifyToken, validateUsuarioId, getXpUser);

export default router;