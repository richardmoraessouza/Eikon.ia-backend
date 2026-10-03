import swaggerJsdoc from 'swagger-jsdoc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceDirectory = path.dirname(fileURLToPath(import.meta.url));
const toGlobPath = (...segments) => path.resolve(sourceDirectory, ...segments).replaceAll(path.sep, '/');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eikon.ai API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        UserProfile: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            gmail: { type: 'string', format: 'email' },
            foto_perfil: { type: 'string', nullable: true },
            descricao: { type: 'string', nullable: true },
            frame: { type: 'string', nullable: true },
            username: { type: 'string' },
            hide_favorite_character: { type: 'boolean' },
            hide_recent_character: { type: 'boolean' },
            hide_followers: { type: 'boolean' },
            hide_following: { type: 'boolean' }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Validação falhou' },
            details: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                  value: {}
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            code: { type: 'string' }
          }
        },
        CharacterSummary: {
          type: 'object',
          properties: {
            public_id: { type: 'string' },
            nome: { type: 'string' },
            fotoia: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
            tipo_personagem: { type: 'string', enum: ['ficcional', 'person'] },
            usuario_id: { type: 'integer' },
            descricao: { type: 'string', nullable: true },
            is_public: { type: 'boolean' },
            tags: { type: 'array', nullable: true, items: { type: 'string' } },
            visualizacoes: { type: 'integer' },
            criado_em: { type: 'string', format: 'date-time' }
          }
        },
        Character: {
          allOf: [
            { $ref: '#/components/schemas/CharacterSummary' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer', description: 'Internal character ID, returned only by endpoints that expose the full record.' },
                genero: { type: 'string', nullable: true },
                personalidade: { type: 'string', nullable: true },
                historia: { type: 'string', nullable: true },
                regras: { type: 'string', nullable: true },
                obra: { type: 'string', nullable: true },
                aparencia: { type: 'string', nullable: true },
                gostos: { type: 'string', nullable: true },
                desgostos: { type: 'string', nullable: true },
                objetivos: { type: 'string', nullable: true },
                primeiramensagem: { type: 'string', nullable: true },
                relacaousuario: { type: 'string', nullable: true },
                cenario: { type: 'string', nullable: true },
                quick_prompt: { type: 'string', nullable: true },
                is_modo_rapido: { type: 'boolean', nullable: true },
                conversation_style: { type: 'string', nullable: true },
                views: { type: 'integer' }
              }
            }
          ]
        },
        CreateCharacter: {
          allOf: [
            { $ref: '#/components/schemas/CharacterWrite' },
            {
              type: 'object',
              required: ['nome', 'tipo_personagem']
            }
          ]
        },
        CharacterWrite: {
          type: 'object',
          properties: {
            nome: { type: 'string', minLength: 1, maxLength: 100 },
            bio: { type: 'string', maxLength: 500 },
            tipo_personagem: { type: 'string', enum: ['ficcional', 'person'] },
            fotoia: { type: 'string', description: 'HTTP/HTTPS URL, relative path, or Base64 image data.' },
            descricao: { type: 'string' },
            genero: { type: 'string' },
            personalidade: { type: 'string', maxLength: 1000 },
            historia: { type: 'string' },
            regras: { type: 'string' },
            obra: { type: 'string' },
            aparencia: { type: 'string' },
            gostos: { type: 'string' },
            desgostos: { type: 'string' },
            objetivos: { type: 'string' },
            primeiramensagem: { type: 'string' },
            relacaousuario: { type: 'string' },
            cenario: { type: 'string' },
            quick_prompt: { type: 'string' },
            is_modo_rapido: { type: 'boolean' },
            conversation_style: { type: 'string' },
            is_public: { type: 'boolean', default: true }
          }
        },
        CharacterList: {
          type: 'array',
          items: { $ref: '#/components/schemas/CharacterSummary' }
        },
        DiscoveryPopularCharacter: {
          type: 'object',
          properties: {
            public_id: { type: 'string' },
            nome: { type: 'string' },
            fotoia: { type: 'string', nullable: true },
            tipo_personagem: { type: 'string', enum: ['ficcional', 'person'] },
            usuario_id: { type: 'integer' },
            bio: { type: 'string', nullable: true },
            descricao: { type: 'string', nullable: true },
            visualizacoes: { type: 'integer' },
            tags: { type: 'array', nullable: true, items: { type: 'string' } },
            quantidade_favoritos: { type: 'string', pattern: '^[0-9]+$' },
            score_popularidade: { type: 'string', pattern: '^[0-9]+$' }
          }
        },
        DiscoveryRecommendation: {
          type: 'object',
          properties: {
            public_id: { type: 'string' },
            nome: { type: 'string' },
            fotoia: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
            usuario_id: { type: 'integer' },
            visualizacoes: { type: 'integer' },
            tags: { type: 'array', nullable: true, items: { type: 'string' } },
            score_total: { type: 'string', pattern: '^[0-9]+$' },
            quantidade_favoritos: { type: 'string', pattern: '^[0-9]+$' }
          }
        },
        DiscoveryCharacterList: {
          type: 'array',
          items: { $ref: '#/components/schemas/DiscoveryRecommendation' }
        },
        Mission: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            mission_id: { type: 'integer' },
            usuario_id: { type: 'integer' },
            progresso: { type: 'integer' },
            completada: { type: 'boolean' },
            coletada_em: { type: 'string', format: 'date-time', nullable: true },
            data_atribuida: { type: 'string', format: 'date-time' },
            tipo: { type: 'string', example: 'daily' },
            titulo: { type: 'string' },
            descricao: { type: 'string' },
            objetivo: { type: 'integer' },
            xp: { type: 'integer' }
          }
        },
        MissionProgress: {
          type: 'object',
          properties: {
            completada: { type: 'boolean' },
            progresso: { type: 'integer' },
            xpGanho: { type: 'integer' }
          }
        },
        MissionClaim: {
          type: 'object',
          properties: {
            xp_awarded: { type: 'integer' },
            updated: { $ref: '#/components/schemas/Mission' }
          }
        },
        MissionError: {
          type: 'object',
          properties: {
            erro: { type: 'string' },
            code: { type: 'string' },
            stack: { type: 'string' }
          }
        },
        RatingsTag: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            slug: { type: 'string' }
          }
        },
        RatedCharacter: {
          type: 'object',
          properties: {
            public_id: { type: 'string' },
            nome: { type: 'string' },
            fotoia: { type: 'string', nullable: true },
            bio: { type: 'string', nullable: true },
            descricao: { type: 'string', nullable: true },
            visualizacoes: { type: 'integer' },
            criado_em: { type: 'string', format: 'date-time' },
            tags_slugs: {
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        RatingsError: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      },
      parameters: {
        CharacterId: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer', minimum: 1 }
        },
        PublicId: {
          name: 'publicId',
          in: 'path',
          required: true,
          schema: { type: 'string', minLength: 1 }
        },
        UsuarioId: {
          name: 'usuarioId',
          in: 'path',
          required: true,
          schema: { type: 'integer', minimum: 1 }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      },
      responses: {
        BadRequest: {
          description: 'Request validation failed.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ValidationError' }
            }
          }
        },
        Unauthorized: {
          description: 'Authentication is missing or invalid.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        Forbidden: {
          description: 'The authenticated user does not have permission for this resource.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        NotFound: {
          description: 'Character not found.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        },
        ServerError: {
          description: 'Unexpected server error.',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' }
            }
          }
        }
      }
    },
  },
  apis: [
    toGlobPath('modules', '**', 'routes', '*.js'),
    toGlobPath('modules', 'auth', 'authRouter.swagger.js'),
    toGlobPath('modules', 'characters', 'CharacterRouter.swagger.js'),
    toGlobPath('modules', 'discovery', 'discoveryRouter.swagger.js'),
    toGlobPath('modules', 'missions', 'missionsRouter.swagger.js'),
    toGlobPath('modules', 'ratings', 'ratingsRouter.swagger.js'),
    toGlobPath('modules', 'social', 'socialRouter.swagger.js'),
    toGlobPath('modules', 'users', 'usersRouter.swagger.js')
  ],
};

export default swaggerJsdoc(options);