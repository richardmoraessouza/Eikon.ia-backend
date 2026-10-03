/**
 * @swagger
 * tags:
 *   name: Social
 *   description: Likes, favoritos e relacionamentos entre usuários.
 */

/**
 * @swagger
 * /social/favorites/{usuario_id}/{personagem_id}:
 *   post:
 *     summary: Adiciona ou remove um personagem dos favoritos
 *     description: O usuário informado no caminho deve corresponder ao usuário autenticado.
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: path
 *         name: personagem_id
 *         required: true
 *         description: ID interno ou public_id do personagem.
 *         schema: { type: string, minLength: 1 }
 *     responses:
 *       '201':
 *         description: Personagem adicionado aos favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 201 }
 *                 favorited: { type: boolean, example: true }
 *                 message: { type: string, example: Favorite added }
 *       '200':
 *         description: Personagem removido dos favoritos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: integer, example: 200 }
 *                 favorited: { type: boolean, example: false }
 *                 message: { type: string, example: Favorite removed }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/favorites-by-user/{usuario_id}:
 *   get:
 *     summary: Lista os personagens favoritos de um usuário
 *     description: Visitantes veem somente personagens públicos; o dono pode ver também personagens privados. A preferência hide_favorite_character oculta toda a lista de terceiros.
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Lista de favoritos visíveis ao solicitante.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   public_id: { type: string, example: ch_123 }
 *                   nome: { type: string, example: Personagem }
 *                   fotoia: { type: string, nullable: true }
 *                   bio: { type: string, nullable: true }
 *                   usuario_id: { type: integer, nullable: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/toggle-like/{usuario_id}/{personagem_id}:
 *   post:
 *     summary: Adiciona ou remove um like de um personagem
 *     description: O usuário informado no caminho deve corresponder ao usuário autenticado.
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: path
 *         name: personagem_id
 *         required: true
 *         description: ID interno ou public_id do personagem.
 *         schema: { type: string, minLength: 1 }
 *     responses:
 *       '201':
 *         description: Like adicionado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked: { type: boolean, example: true }
 *                 message: { type: string, example: Like added }
 *       '200':
 *         description: Like removido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 liked: { type: boolean, example: false }
 *                 message: { type: string, example: Like removed }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/likes-quantity/{personagem_id}:
 *   get:
 *     summary: Retorna a quantidade de likes de um personagem
 *     tags: [Social]
 *     parameters:
 *       - in: path
 *         name: personagem_id
 *         required: true
 *         description: ID interno ou public_id do personagem.
 *         schema: { type: string, minLength: 1 }
 *     responses:
 *       '200':
 *         description: Quantidade de likes (zero se o personagem não existir).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [personagem_id, likes]
 *               properties:
 *                 personagem_id: { type: string, example: ch_123 }
 *                 likes: { type: integer, minimum: 0, example: 42 }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/likes-by-user/{usuario_id}:
 *   get:
 *     summary: Lista os personagens curtidos pelo usuário autenticado
 *     description: O usuário informado no caminho deve corresponder ao usuário autenticado.
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Lista de public_id dos personagens curtidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { type: string, example: ch_123 }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/follow:
 *   post:
 *     summary: Segue outro usuário
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [seguido_id]
 *             properties:
 *               seguido_id: { type: integer, minimum: 1, description: ID do usuário a seguir. }
 *           example: { seguido_id: 5 }
 *     responses:
 *       '201':
 *         description: Relação de seguimento criada (ou já existente).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Following user }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/unfollow:
 *   delete:
 *     summary: Deixa de seguir outro usuário
 *     tags: [Social]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [seguido_id]
 *             properties:
 *               seguido_id: { type: integer, minimum: 1, description: ID do usuário a deixar de seguir. }
 *           example: { seguido_id: 5 }
 *     responses:
 *       '200':
 *         description: Relação de seguimento removida (ou já inexistente).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Unfollowed user }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/users/{id}/followers:
 *   get:
 *     summary: Lista os seguidores de um usuário
 *     tags: [Social]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Lista de usuários que seguem o usuário informado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   nome: { type: string }
 *                   foto_perfil: { type: string, nullable: true }
 *                   frame: { type: string, nullable: true }
 *                   username: { type: string, nullable: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /social/users/{id}/following:
 *   get:
 *     summary: Lista quem um usuário está seguindo
 *     tags: [Social]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *     responses:
 *       '200':
 *         description: Lista de usuários seguidos pelo usuário informado.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   nome: { type: string }
 *                   foto_perfil: { type: string, nullable: true }
 *                   frame: { type: string, nullable: true }
 *                   username: { type: string, nullable: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */