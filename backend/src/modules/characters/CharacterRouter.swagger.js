/**
 * @swagger
 * /character/user-search-by-id/{usuarioId}:
 *   get:
 *     summary: List characters created by a user
 *     description: Public characters are returned for visitors. An authenticated owner also receives their private characters.
 *     tags:
 *       - Characters
 *     parameters:
 *       - $ref: '#/components/parameters/UsuarioId'
 *     responses:
 *       200:
 *         description: Characters belonging to the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CharacterList'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/search-character:
 *   get:
 *     summary: Search public characters by name
 *     description: Provide either nomePersonagem or q. The tag, limit, and offset filters are optional.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: query
 *         name: nomePersonagem
 *         required: false
 *         schema:
 *           type: string
 *           maxLength: 100
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *           maxLength: 100
 *       - in: query
 *         name: tag
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Matching public characters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CharacterList'
 *       400:
 *         description: Search term is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/explore:
 *   get:
 *     summary: Get characters for the explore feed
 *     description: Returns public characters and supports offset-based pagination. The server caps each page at 20 characters.
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *           maximum: 20
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *       - in: query
 *         name: seed
 *         required: false
 *         schema:
 *           type: number
 *           default: 0.5
 *       - in: query
 *         name: popularIds
 *         required: false
 *         description: Comma-separated internal character IDs to exclude.
 *         schema:
 *           type: string
 *           example: 12,25,31
 *     responses:
 *       200:
 *         description: Explore feed characters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CharacterList'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/data-character-by-id/{id}:
 *   get:
 *     summary: Get a character by its internal ID
 *     description: Private characters are only visible to their owner. Authentication is optional for public characters.
 *     tags:
 *       - Characters
 *     parameters:
 *       - $ref: '#/components/parameters/CharacterId'
 *     responses:
 *       200:
 *         description: Character details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/data-character-by-public-id/{publicId}:
 *   get:
 *     summary: Get a character by its public ID
 *     description: Private characters are only visible to their owner. Authentication is optional for public characters.
 *     tags:
 *       - Characters
 *     parameters:
 *       - $ref: '#/components/parameters/PublicId'
 *     responses:
 *       200:
 *         description: Character details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/update-character/{id}:
 *   put:
 *     summary: Update a character
 *     description: Requires the character owner. The identifier may be an internal ID or public ID. Do not combine quick-mode fields with detailed-mode fields.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[A-Za-z0-9_-]+$'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CharacterWrite'
 *           example:
 *             nome: Naruto Uzumaki
 *             tipo_personagem: ficcional
 *             bio: Ninja da Folha
 *             personalidade: Determinado e leal
 *             is_modo_rapido: false
 *     responses:
 *       200:
 *         description: Updated character record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/update-visibility/{publicId}:
 *   patch:
 *     summary: Change a character's visibility
 *     description: Requires the character owner.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PublicId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_public
 *             properties:
 *               is_public:
 *                 type: boolean
 *           example:
 *             is_public: false
 *     responses:
 *       200:
 *         description: Updated character visibility
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 public_id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 is_public:
 *                   type: boolean
 *                 usuario_id:
 *                   type: integer
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/create-character/{usuarioId}:
 *   post:
 *     summary: Create a character for a user
 *     description: Requires authentication as the user in usuarioId. Quick-mode fields and detailed-mode fields cannot be sent together.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UsuarioId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCharacter'
 *           example:
 *             nome: Meu personagem
 *             tipo_personagem: ficcional
 *             bio: Uma breve descrição
 *             personalidade: Corajoso e curioso
 *             fotoia: https://example.com/personagem.png
 *             is_public: true
 *     responses:
 *       201:
 *         description: Created character record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/recent-characters/{usuarioId}/{personagemId}:
 *   post:
 *     summary: Save a character to a user's recent history
 *     description: Requires authentication as the user in usuarioId. personagemId may be an internal or public character ID.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UsuarioId'
 *       - in: path
 *         name: personagemId
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 1
 *     responses:
 *       200:
 *         description: Character saved to recent history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *             example:
 *               success: true
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/get-recent-characters/{usuarioId}:
 *   get:
 *     summary: Get a user's recent characters
 *     description: Requires authentication. A user's privacy setting may cause another viewer to receive an empty list.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UsuarioId'
 *     responses:
 *       200:
 *         description: Recent characters, up to 20 records
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CharacterList'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/character-views/{id}:
 *   get:
 *     summary: Get a character profile and its view count
 *     description: Requires authentication.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CharacterId'
 *     responses:
 *       200:
 *         description: Character profile with total views
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/increment-chat-views/{id}:
 *   post:
 *     summary: Register an authenticated user's first view of a character
 *     description: Requires authentication. The total view count increases only once per user and character.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CharacterId'
 *     responses:
 *       200:
 *         description: View registration result and current total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - views
 *               properties:
 *                 success:
 *                   type: boolean
 *                 views:
 *                   type: integer
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /character/increment-chat-views-public/{publicId}:
 *   post:
 *     summary: Register an authenticated user's first view by public ID
 *     description: Requires authentication. The total view count increases only once per user and character.
 *     tags:
 *       - Characters
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/PublicId'
 *     responses:
 *       200:
 *         description: View registration result and current total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - success
 *                 - views
 *               properties:
 *                 success:
 *                   type: boolean
 *                 views:
 *                   type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */