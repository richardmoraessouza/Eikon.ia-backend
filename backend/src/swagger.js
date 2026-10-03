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
      }
    },
  },
  apis: [
    toGlobPath('modules', '**', 'routes', '*.js'),
    toGlobPath('modules', 'auth', 'authRouter.swagger.js')
  ],
};

export default swaggerJsdoc(options);