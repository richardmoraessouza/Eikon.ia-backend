/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile data, settings, frames and progression.
 */

/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Get a user profile by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: User profile and privacy settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer, example: 12 }
 *                 nome: { type: string, example: Joao Silva }
 *                 foto_perfil: { type: string, nullable: true }
 *                 descricao: { type: string, nullable: true }
 *                 username: { type: string, nullable: true }
 *                 hide_favorite_character: { type: boolean }
 *                 hide_recent_character: { type: boolean }
 *                 hide_followers: { type: boolean }
 *                 hide_following: { type: boolean }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/name-user/{id}:
 *   get:
 *     summary: Get a user's basic profile by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Basic profile fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome: { type: string }
 *                 foto_perfil: { type: string, nullable: true }
 *                 descricao: { type: string, nullable: true }
 *                 frame: { type: string, nullable: true }
 *                 username: { type: string, nullable: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/other-user/{id}:
 *   get:
 *     summary: Get a user profile by username
 *     description: The path parameter is a username, not a numeric user ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Username used to look up the profile.
 *         schema: { type: string, minLength: 1, example: user.name }
 *     responses:
 *       '200':
 *         description: Matching user profile and privacy settings.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 nome: { type: string }
 *                 foto_perfil: { type: string, nullable: true }
 *                 descricao: { type: string, nullable: true }
 *                 frame: { type: string, nullable: true }
 *                 username: { type: string }
 *                 hide_favorite_character: { type: boolean }
 *                 hide_recent_character: { type: boolean }
 *                 hide_followers: { type: boolean }
 *                 hide_following: { type: boolean }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/edit-profile/{usuarioId}:
 *   put:
 *     summary: Update the authenticated user's profile
 *     description: The path user ID must match the authenticated user. Omitted properties remain unchanged.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string, minLength: 1, example: Joao Silva }
 *               foto_perfil: { type: string, nullable: true }
 *               descricao: { type: string, nullable: true }
 *               username: { type: string, minLength: 3, maxLength: 20, pattern: '^[A-Za-z0-9._]+$' }
 *               hide_favorite_character: { type: boolean }
 *               hide_recent_character: { type: boolean }
 *               hide_followers: { type: boolean }
 *               hide_following: { type: boolean }
 *           example:
 *             nome: Joao Silva
 *             username: joao.silva
 *             hide_followers: false
 *     responses:
 *       '200':
 *         description: Updated profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Perfil atualizado com sucesso! }
 *                 usuario_atualizado: { type: object }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '409':
 *         description: Username already in use.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/name-other-user/{usuarioId}:
 *   get:
 *     summary: Get a user's name by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: The name is null when no matching user exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nome: { type: string, nullable: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/mini-profile/{usuarioId}:
 *   get:
 *     summary: Get mini profile and progression data by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Mini profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 nome: { type: string }
 *                 foto_perfil: { type: string, nullable: true }
 *                 descricao: { type: string, nullable: true }
 *                 frame: { type: string, nullable: true }
 *                 username: { type: string, nullable: true }
 *                 is_online: { type: boolean }
 *                 nivel: { type: integer }
 *                 xp: { type: integer }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/update-frame/{usuarioId}:
 *   put:
 *     summary: Update or clear the authenticated user's profile frame
 *     description: The path user ID must match the authenticated user. Frames unlock at the level returned by frame-unlocks; null or an empty string clears the frame.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               frame:
 *                 type: string
 *                 nullable: true
 *                 description: Frame key, accepted legacy alias, filename, or empty string to clear.
 *                 enum: [cat, cyberpunk, foxy, rainbow, dark, horror, bronze, diamond, frameCat.png, frameCyberpunk.png, frameFoxy.png, frameRainbow.png, frameDark.png, frameHorror.png, '']
 *           example: { frame: cat }
 *     responses:
 *       '200':
 *         description: Updated frame; null means cleared.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frame: { type: string, nullable: true, example: cat }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403':
 *         description: User mismatch or frame is locked for the user's level.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/level-user/{usuarioId}:
 *   get:
 *     summary: Get the authenticated user's level
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: User level.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nivel: { type: integer, example: 5 }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/frame-unlocks/{usuarioId}:
 *   get:
 *     summary: Get available frame unlocks for the authenticated user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Current level and unlock requirements for each frame.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nivel: { type: integer, example: 5 }
 *                 frames:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       file: { type: string, example: frameCat.png }
 *                       unlocked: { type: boolean, example: true }
 *                       requiredLevel: { type: integer, example: 5 }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /users/xp-user/{usuarioId}:
 *   get:
 *     summary: Get the authenticated user's XP
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: XP is null if no matching user record is found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 xp: { type: integer, nullable: true, example: 250 }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */