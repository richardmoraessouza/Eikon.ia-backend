/**
 * @swagger
 * /missions/daily/{usuarioId}:
 *   get:
 *     summary: Get a user's missions
 *     description: Requires authentication as the user in usuarioId. The current implementation creates five missions in process memory on first access; state is lost when the server restarts and is not reset daily.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: The user's five missions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mission'
 *             example:
 *               - id: 1000
 *                 mission_id: 1000
 *                 usuario_id: 12
 *                 progresso: 0
 *                 completada: false
 *                 coletada_em: null
 *                 data_atribuida: '2026-10-03T12:00:00.000Z'
 *                 tipo: daily
 *                 titulo: Missão diária 1
 *                 descricao: Complete 3 ações para concluir esta missão.
 *                 objetivo: 3
 *                 xp: 30
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
 * /missions/progress:
 *   post:
 *     summary: Increment a mission's progress
 *     description: Requires authentication as usuarioId. incremento defaults to 1 when omitted. Progress is capped at the mission objective.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - missionId
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 minimum: 1
 *               missionId:
 *                 type: integer
 *                 minimum: 1
 *               incremento:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *           example:
 *             usuarioId: 12
 *             missionId: 1000
 *             incremento: 1
 *     responses:
 *       200:
 *         description: Updated mission progress
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionProgress'
 *             examples:
 *               inProgress:
 *                 value:
 *                   completada: false
 *                   progresso: 2
 *                   xpGanho: 0
 *               completed:
 *                 value:
 *                   completada: true
 *                   progresso: 3
 *                   xpGanho: 30
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       404:
 *         description: Mission not found for this user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionError'
 *             example:
 *               erro: Mission not found
 *               code: MISSION_NOT_FOUND
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

/**
 * @swagger
 * /missions/claim/{missionId}:
 *   post:
 *     summary: Claim a completed mission's XP
 *     description: Requires authentication. Only a mission belonging to the authenticated user can be claimed.
 *     tags:
 *       - Missions
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: missionId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: XP claimed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionClaim'
 *             example:
 *               xp_awarded: 30
 *               updated:
 *                 id: 1000
 *                 mission_id: 1000
 *                 usuario_id: 12
 *                 progresso: 3
 *                 completada: true
 *                 coletada_em: '2026-10-03T12:30:00.000Z'
 *                 data_atribuida: '2026-10-03T12:00:00.000Z'
 *                 tipo: daily
 *                 titulo: Missão diária 1
 *                 descricao: Complete 3 ações para concluir esta missão.
 *                 objetivo: 3
 *                 xp: 30
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: Mission not found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionError'
 *             example:
 *               erro: Mission not found
 *               code: MISSION_NOT_FOUND
 *       409:
 *         description: Mission is incomplete or its reward was already claimed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissionError'
 *             examples:
 *               incomplete:
 *                 value:
 *                   erro: Mission not completed
 *                   code: MISSION_NOT_COMPLETED
 *               alreadyClaimed:
 *                 value:
 *                   erro: Already claimed
 *                   code: MISSION_ALREADY_CLAIMED
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */