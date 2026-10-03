/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user account
 *     description: Register using a Google ID credential obtained from Google Sign-In.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - credential
 *               - nome
 *               - username
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Google ID credential.
 *               nome:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 pattern: '^[\p{L} -]+$'
 *                 example: João Silva
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 20
 *                 pattern: '^(?=(?:.*[A-Za-z]){3})[a-zA-Z0-9._]+$'
 *                 description: Must contain at least 3 letters; only letters, numbers, dots, and underscores are allowed.
 *                 example: joao.silva
 *               imgPerfil:
 *                 type: string
 *                 description: Optional HTTPS image URL or Base64 image data.
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *             example:
 *               id: 12
 *               gmail: joao@gmail.com
 *               nome: João Silva
 *               foto_perfil: https://example.com/foto.jpg
 *               descricao: Apaixonado por anime
 *               frame: gold
 *               username: joao.silva
 *               hide_favorite_character: false
 *               hide_recent_character: false
 *               hide_followers: false
 *               hide_following: false
 *       400:
 *         description: Invalid registration data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               success: false
 *               error: Validação falhou
 *               details:
 *                 - field: username
 *                   message: Username é obrigatório
 *       401:
 *         description: Invalid or unverified Google credential
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Username is already in use
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error registering user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign in with Google
 *     description: Send the Google ID credential obtained from Google Sign-In. On success, the API sets an HttpOnly cookie with a 7-day session that Swagger sends automatically on later requests.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - credential
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Google ID credential returned by Google Sign-In.
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *             example:
 *               id: 12
 *               nome: João Silva
 *               gmail: joao@gmail.com
 *               foto_perfil: https://example.com/foto.jpg
 *               descricao: Apaixonado por anime e RPG
 *               frame: gold
 *               username: joao.silva
 *               hide_favorite_character: false
 *               hide_recent_character: false
 *               hide_followers: false
 *               hide_following: false
 *       400:
 *         description: Invalid login data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         description: Google credential is invalid or no account is registered for this Google account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error logging in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out
 *     description: Clears the HttpOnly authentication cookie. If a valid session cookie is present, also marks the user as offline.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Session cookie cleared
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *             example:
 *               sucesso: true
 *       500:
 *         description: Error updating the user's online status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Requires the HttpOnly cookie set by registration or login. Swagger sends this cookie automatically after authentication.
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserProfile'
 *             example:
 *               id: 12
 *               nome: João Silva
 *               gmail: joao@gmail.com
 *               foto_perfil: https://example.com/foto.jpg
 *               descricao: Apaixonado por anime e RPG
 *               frame: gold
 *               username: joao.silva
 *               hide_favorite_character: false
 *               hide_recent_character: false
 *               hide_followers: false
 *               hide_following: false
 *       401:
 *         description: Missing or invalid authentication cookie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error fetching user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /auth/check-email/{gmail}:
 *   get:
 *     summary: Check whether an account exists for an email
 *     description: "Returns exists=false and user=null when there is no account for this email."
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: gmail
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: User's email address
 *     responses:
 *       200:
 *         description: Email check completed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - exists
 *                 - user
 *               properties:
 *                 exists:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     gmail:
 *                       type: string
 *                       format: email
 *                     username:
 *                       type: string
 *                     foto_perfil:
 *                       type: string
 *                       nullable: true
 *                     frame:
 *                       type: string
 *                       nullable: true
 *             examples:
 *               found:
 *                 value:
 *                   exists: true
 *                   user:
 *                     gmail: joao@gmail.com
 *                     username: joao.silva
 *                     foto_perfil: https://example.com/foto.jpg
 *                     frame: gold
 *               notFound:
 *                 value:
 *                   exists: false
 *                   user: null
 *       400:
 *         description: Invalid email address
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Error searching user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */