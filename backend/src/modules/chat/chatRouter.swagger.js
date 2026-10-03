/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Character conversations, chat history, messages and conversation time.
 */

/**
 * @swagger
 * /chat/chat/{personagemId}:
 *   post:
 *     summary: Send a message to a character and generate an AI reply
 *     description: Accepts an authenticated session or an anonymous identifier. Anonymous requests can provide X-Anon-Id or X-Guest-Id; anonId is also accepted in the body, query string, or cookie.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: personagemId
 *         required: true
 *         description: Internal character ID or public_id.
 *         schema: { type: string, minLength: 1, example: char_public_id }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string, minLength: 1 }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string, minLength: 1 }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message: { type: string, minLength: 1, maxLength: 4000 }
 *               replyToId: { type: integer, minimum: 1, nullable: true }
 *               isVoiceCall: { type: boolean }
 *               anonId: { type: string, description: Anonymous identity, used when no valid user token is present. }
 *           example:
 *             message: Olá, tudo bem?
 *             replyToId: 123
 *             isVoiceCall: false
 *     responses:
 *       '200':
 *         description: AI reply and persisted user/assistant message IDs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer, description: Saved user message ID. }
 *                 reply: { type: array, items: { type: string } }
 *                 replyIds: { type: array, items: { type: integer } }
 *                 replyToIds: { type: array, items: { type: integer, nullable: true } }
 *                 quotes: { type: object, additionalProperties: true }
 *                 figurinha: { nullable: true }
 *                 missoesCompletadas: { type: array, items: { type: object } }
 *                 success: { type: boolean, example: true }
 *       '400':
 *         description: Message or reply ID validation failed.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404':
 *         description: Character or referenced message not found.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '503':
 *         description: AI provider is unavailable.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/chat/{personagemId}/historico:
 *   get:
 *     summary: Get paginated conversation history
 *     description: Requires a valid login or an anonymous identifier (X-Anon-Id, X-Guest-Id, or anonId). Returns the latest 30 messages by default.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: personagemId
 *         required: true
 *         description: Internal character ID or public_id.
 *         schema: { type: string, minLength: 1 }
 *       - in: query
 *         name: limit
 *         required: false
 *         schema: { type: integer, default: 30 }
 *       - in: query
 *         name: offset
 *         required: false
 *         schema: { type: integer, default: 0 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Messages ordered chronologically within the requested page.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   role: { type: string, enum: [user, model] }
 *                   content: { type: string }
 *                   is_pinned: { type: boolean }
 *                   reply_to_id: { type: integer, nullable: true }
 *                   media: { type: array, items: { type: object } }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404':
 *         description: Character not found.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/chat/{personagemId}/message/{messageId}:
 *   get:
 *     summary: Get a message by ID
 *     description: Returns a message only when it belongs to the authenticated or resolved anonymous user. The personagemId segment is retained for compatibility; lookup is by messageId and user.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: personagemId
 *         required: true
 *         description: Internal character ID or public_id (retained in the route for compatibility).
 *         schema: { type: string, minLength: 1 }
 *       - in: path
 *         name: messageId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Matching message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: integer }
 *                 role: { type: string, enum: [user, model] }
 *                 content: { type: string }
 *                 reply_to_id: { type: integer, nullable: true }
 *                 is_pinned: { type: boolean }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404':
 *         description: Message not found for this user.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/{personagemId}/limpar:
 *   delete:
 *     summary: Clear the conversation memory for a character
 *     description: Requires a valid login or anonymous identifier (X-Anon-Id, X-Guest-Id, or anonId). This endpoint currently returns success without deleting persisted message records.
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: personagemId
 *         required: true
 *         description: Positive internal character ID.
 *         schema: { type: integer, minimum: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Memory-clearing request completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/{userId}/{characterId}/history:
 *   get:
 *     summary: Get history for the authenticated user and character
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: path
 *         name: characterId
 *         required: true
 *         description: Internal character ID or public_id.
 *         schema: { type: string, minLength: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Conversation messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { type: object }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/{userId}/{characterId}/messages:
 *   post:
 *     summary: Save a message without requesting an AI response
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: path
 *         name: characterId
 *         required: true
 *         description: Internal character ID or public_id.
 *         schema: { type: string, minLength: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [role, content]
 *             properties:
 *               role: { type: string, enum: [user, model] }
 *               content: { type: string, minLength: 1 }
 *               replyToId: { type: integer, nullable: true, minimum: 1 }
 *           example: { role: user, content: Olá, replyToId: 10 }
 *     responses:
 *       '201':
 *         description: Saved message record.
 *         content:
 *           application/json:
 *             schema: { type: object, properties: { id: { type: integer }, role: { type: string }, content: { type: string }, reply_to_id: { type: integer, nullable: true } } }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '403': { $ref: '#/components/responses/Forbidden' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/messages/{id}:
 *   delete:
 *     summary: Delete a message belonging to the current user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Message deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Message deleted successfully }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404':
 *         description: Message not found for this user.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/messages/{id}/pin:
 *   patch:
 *     summary: Pin or unpin a message belonging to the current user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [isPinned]
 *             properties:
 *               isPinned: { type: boolean }
 *           example: { isPinned: true }
 *     responses:
 *       '200':
 *         description: Updated message.
 *         content:
 *           application/json:
 *             schema: { type: object }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/chats/{chatId}/pinned:
 *   get:
 *     summary: List pinned messages in a chat owned by the current user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema: { type: integer, minimum: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Pinned messages.
 *         content:
 *           application/json:
 *             schema: { type: array, items: { type: object } }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 */

/**
 * @swagger
 * /chat/conversation-time:
 *   post:
 *     summary: Save elapsed conversation time for the authenticated user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [characterId, seconds]
 *             properties:
 *               characterId: { type: string, minLength: 1, description: Internal character ID or public_id. }
 *               seconds: { type: number, exclusiveMinimum: 0, maximum: 28800 }
 *           example: { characterId: char_public_id, seconds: 300 }
 *     responses:
 *       '200':
 *         description: Updated total conversation time. Sessions shorter than five seconds contribute zero.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 total_seconds: { type: integer, example: 300 }
 *       '400':
 *         description: Required fields are missing.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404':
 *         description: Character not found.
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/conversation-time/{characterId}:
 *   get:
 *     summary: Get total conversation time for the authenticated user and character
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: characterId
 *         required: true
 *         description: Internal character ID or public_id.
 *         schema: { type: string, minLength: 1 }
 *     responses:
 *       '200':
 *         description: Conversation time record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_seconds: { type: integer }
 *                 updated_at: { type: string, format: date-time, nullable: true }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */

/**
 * @swagger
 * /chat/{publicId}/mensagens:
 *   delete:
 *     summary: Delete all persisted messages in the current user's conversation with a character
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *       - {}
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         description: Character public_id (the service also accepts an internal ID).
 *         schema: { type: string, minLength: 1 }
 *       - in: header
 *         name: X-Anon-Id
 *         required: false
 *         schema: { type: string }
 *       - in: header
 *         name: X-Guest-Id
 *         required: false
 *         schema: { type: string }
 *     responses:
 *       '200':
 *         description: Number of deleted messages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso: { type: boolean, example: true }
 *                 mensagensApagadas: { type: integer, example: 12 }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '500': { $ref: '#/components/responses/ServerError' }
 */