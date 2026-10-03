/**
 * @swagger
 * /discovery/popular-week:
 *   get:
 *     summary: Get the most popular public characters from the last seven days
 *     description: Returns at most ten characters, ranked by views plus fifteen points for each favorite.
 *     tags:
 *       - Discovery
 *     responses:
 *       200:
 *         description: Weekly popular characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DiscoveryPopularCharacter'
 *             example:
 *               - public_id: abc123xyz
 *                 nome: Naruto
 *                 fotoia: https://example.com/naruto.jpg
 *                 tipo_personagem: ficcional
 *                 usuario_id: 12
 *                 bio: Ninja da Folha
 *                 descricao: Personagem principal
 *                 visualizacoes: 1000
 *                 tags:
 *                   - anime
 *                 quantidade_favoritos: '32'
 *                 score_popularidade: '1480'
 *       500:
 *         description: Failed to load weekly popular characters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: Error loading popular characters of the week.
 */

/**
 * @swagger
 * /discovery/recommendations/{usuarioId}:
 *   get:
 *     summary: Get personalized character recommendations
 *     description: Returns public characters based on the user's tag interaction scores, excluding recently viewed characters when possible. Results can include popular public fallback characters when there are too few matches.
 *     tags:
 *       - Discovery
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         description: Positive integer ID of the user whose interaction scores are used.
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - in: query
 *         name: page
 *         required: false
 *         description: One-based result page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of results requested. Must be a positive integer.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *     responses:
 *       200:
 *         description: Recommended public characters. Ranked results contain score_total; fallback results may contain quantidade_favoritos instead.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DiscoveryCharacterList'
 *             examples:
 *               ranked:
 *                 value:
 *                   - public_id: xyz789
 *                     nome: Sasuke
 *                     fotoia: https://example.com/sasuke.jpg
 *                     bio: Último sobrevivente do clã Uchiha
 *                     usuario_id: 12
 *                     visualizacoes: 540
 *                     tags:
 *                       - anime
 *                     score_total: '35'
 *               fallback:
 *                 value:
 *                   - public_id: fallback123
 *                     nome: Sakura
 *                     fotoia: https://example.com/sakura.jpg
 *                     bio: Ninja médica
 *                     usuario_id: 15
 *                     visualizacoes: 210
 *                     tags:
 *                       - anime
 *                     quantidade_favoritos: '18'
 *       400:
 *         description: User ID, page, or limit is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               success: false
 *               error: Validação falhou
 *               details:
 *                 - field: page
 *                   message: page deve ser um inteiro maior que zero
 *       500:
 *         description: Failed to fetch recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: Erro interno no servidor ao buscar feed
 *               error: Database query failed
 */