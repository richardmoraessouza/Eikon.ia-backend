/**
 * @swagger
 * /ratings/tags:
 *   get:
 *     summary: List available character tags
 *     tags:
 *       - Ratings
 *     responses:
 *       200:
 *         description: Tags available for character classification
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RatingsTag'
 *             example:
 *               - id: 1
 *                 nome: Anime
 *                 slug: anime
 *               - id: 2
 *                 nome: RPG
 *                 slug: rpg
 *       500:
 *         description: Failed to fetch tags
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingsError'
 *             example:
 *               error: Internal server error fetching tags.
 */

/**
 * @swagger
 * /ratings/characters/{slug}:
 *   get:
 *     summary: List public characters in a category
 *     description: Results are ordered by view count and creation time. Pagination defaults to 15 results starting at offset 0.
 *     tags:
 *       - Ratings
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         description: Category slug, containing letters/numbers separated by single hyphens.
 *         schema:
 *           type: string
 *           pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$'
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of characters to return, from 1 to 50.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 15
 *       - in: query
 *         name: offset
 *         required: false
 *         description: Number of matching characters to skip.
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *     responses:
 *       200:
 *         description: Public characters that have the requested tag
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RatedCharacter'
 *             example:
 *               - public_id: abc123xyz
 *                 nome: Naruto
 *                 fotoia: https://example.com/naruto.jpg
 *                 bio: Ninja da Folha
 *                 descricao: Personagem principal
 *                 visualizacoes: 1000
 *                 criado_em: '2026-10-03T12:00:00.000Z'
 *                 tags_slugs:
 *                   - anime
 *       400:
 *         description: Invalid category slug or pagination value
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Failed to fetch characters for the category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingsError'
 *             example:
 *               error: Error fetching characters for this category.
 */

/**
 * @swagger
 * /ratings/reclassify/{characterId}:
 *   post:
 *     summary: Reclassify one of your characters with AI
 *     description: Requires authentication as the character owner. Character data is loaded from the server; request body data is not accepted. The tags array contains tag database IDs and may be empty when classification is skipped or no tags are matched. Processing errors return 500.
 *     tags:
 *       - Ratings
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         description: Positive internal character ID.
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Classification completed or intentionally skipped; tags contains database tag IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - message
 *                 - tags
 *               properties:
 *                 message:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: integer
 *             examples:
 *               classified:
 *                 value:
 *                   message: Character reclassified successfully!
 *                   tags:
 *                     - 1
 *                     - 5
 *               skipped:
 *                 value:
 *                   message: Character reclassified successfully!
 *                   tags: []
 *       400:
 *         description: Character ID is invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingsError'
 *             example:
 *               error: Character not found.
 *       500:
 *         description: Classification could not be processed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RatingsError'
 *             example:
 *               error: Error processing character classification.
 */