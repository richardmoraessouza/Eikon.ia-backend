# Módulo Chat IA

Módulo de chat com personagens usando Google Gemini API com arquitetura Clean Code.

## Estrutura

```
modules/chat_ia/
├── controllers/
│   └── chatController.js       # Handlers HTTP
├── services/
│   └── chatService.js          # Lógica de negócio
├── repository/
│   └── chatRepository.js       # Acesso ao banco de dados
├── routes/
│   └── chatRoutes.js           # Definição de rotas
├── utils/
│   ├── buildPersonPrompt.js    # Builder de prompts
│   └── geminiClient.js         # Cliente Gemini com fallback de chaves
└── index.js                    # Exportações
```

## Endpoints

As rotas abaixo são relativas ao prefixo `/chat` montado pelo servidor. IDs de personagem aceitam o ID interno ou `public_id`, salvo quando indicado.

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `POST` | `/chat/:personagemId` | Envia uma mensagem e solicita resposta da IA. Requer login ou identificador anônimo. |
| `GET` | `/chat/:personagemId/historico` | Busca histórico paginado (`limit`, `offset`). Requer login ou identificador anônimo. |
| `GET` | `/chat/:personagemId/message/:messageId` | Busca uma mensagem do usuário atual. Requer login ou identificador anônimo. |
| `DELETE` | `/:personagemId/limpar` | Limpa a memória da conversa. Atualmente não apaga mensagens persistidas. |
| `GET` | `/:userId/:characterId/history` | Busca histórico para o usuário autenticado; `userId` deve corresponder à sessão. |
| `POST` | `/:userId/:characterId/messages` | Salva mensagem sem chamar a IA; `userId` deve corresponder à sessão. |
| `DELETE` | `/messages/:id` | Apaga uma mensagem do usuário atual. |
| `PATCH` | `/messages/:id/pin` | Fixa ou desafixa uma mensagem do usuário atual. |
| `GET` | `/chats/:chatId/pinned` | Lista mensagens fixadas no chat do usuário atual. |
| `POST` | `/conversation-time` | Registra tempo de conversa; requer autenticação. |
| `GET` | `/conversation-time/:characterId` | Consulta tempo de conversa; requer autenticação. |
| `DELETE` | `/:publicId/mensagens` | Apaga mensagens persistidas da conversa atual com o personagem. |

Para as rotas que aceitam acesso anônimo, envie `X-Anon-Id` ou `X-Guest-Id`; também é aceito `anonId` no corpo, query string ou cookie. Os detalhes dos parâmetros, schemas e respostas estão no Swagger.

Exemplo de corpo para enviar mensagem:

```json
{
  "message": "Olá, tudo bem?",
  "replyToId": 123,
  "isVoiceCall": false
}
```

## Camadas

### Utils
- **buildPersonPrompt.js**: Constrói prompts baseado no tipo de personagem (Ficcional/Person)
- **geminiClient.js**: Gerencia múltiplas chaves Gemini com fallback automático

### Repository
- Acesso direto ao banco de dados
- Cache de personagens (TTL: 5 minutos)
- Operações em histórico de conversa

### Service
- Lógica de chat (validação, memória, Gemini)
- Memória em cache das últimas 20 mensagens
- Tratamento de erros específicos

### Controller
- Handlers HTTP
- Extração de dados de request
- Respostas formatadas

## Variáveis de Ambiente

```env
GEMINI_API_KEY=xxxxx
GEMINI_API_KEY2=xxxxx
GEMINI_API_KEY3=xxxxx
GEMINI_API_KEY4=xxxxx
GEMINI_API_KEY5=xxxxx
GEMINI_KEYS=xxxxx,yyyyy,zzzzz  # Opcional: chaves adicionais separadas por vírgula
```

## Fluxo de Requisição

```
Request HTTP
    ↓
Controller (validação e extração)
    ↓
Service (lógica de negócio)
    ↓
Repository (dados)
    ↓
Gemini API
    ↓
Response
```

## Features

✅ Memória em cache (últimas 20 mensagens)
✅ Gerenciamento automático de múltiplas chaves Gemini
✅ Tipos de personagem: Ficcional e Person
✅ Prompts customizados por tipo
✅ Tratamento robusto de erros
✅ Cache de personagens (5 min TTL)
✅ Suporte a usuários anônimos
