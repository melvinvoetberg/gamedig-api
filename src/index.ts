import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { apiReference } from '@scalar/hono-api-reference'
import query from './routes/query.js'
import type { OpenAPIV3 } from 'openapi-types'

// Create a typed Hono app
const app = new Hono<{
  Variables: {};
  Bindings: {};
}>()

// OpenAPI specification
const openApiSpec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'GameDig API',
    version: '1.0.0',
    description: 'A RESTful API wrapper for the GameDig game server query library.',
  },
  paths: {
    '/api/query': {
      post: {
        summary: 'Query a game server',
        description: 'Query information from a game server using GameDig.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['type', 'host'],
                properties: {
                  type: {
                    type: 'string',
                    description: 'The game type to query (e.g., minecraft, cs2, etc.)',
                  },
                  host: {
                    type: 'string',
                    description: 'The hostname or IP address of the game server',
                  },
                  port: {
                    type: 'number',
                    description: 'The port number of the game server (if different from default)',
                  },
                  maxAttempts: {
                    type: 'number',
                    default: 1,
                    description: 'Maximum number of query attempts',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'data'],
                  properties: {
                    success: {
                      type: 'boolean',
                      description: 'Whether the query was successful',
                    },
                    data: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        map: { type: 'string' },
                        password: { type: 'boolean' },
                        maxplayers: { type: 'number' },
                        players: { 
                          type: 'array',
                          items: {
                            type: 'object',
                            additionalProperties: true,
                          },
                        },
                        bots: {
                          type: 'array',
                          items: {
                            type: 'object',
                            additionalProperties: true,
                          },
                        },
                        connect: { type: 'string' },
                        ping: { type: 'number' },
                        raw: {
                          type: 'object',
                          additionalProperties: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Error response',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['success', 'error'],
                  properties: {
                    success: {
                      type: 'boolean',
                      example: false,
                    },
                    error: {
                      type: 'string',
                      description: 'Error message',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        description: 'Check if the API is running',
        responses: {
          '200': {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}

// Enable CORS
app.use('/*', cors())

// Mount API routes
app.route('/api/query', query)

// Serve OpenAPI specification
app.get('/openapi.json', (c) => c.json(openApiSpec))

// API Documentation
app.get('/docs', apiReference({
  pageTitle: 'GameDig API',
  spec: {
    url: '/openapi.json',
  },
}))

// Health check endpoint
app.get('/health', (c) => c.json({ status: 'ok' }))

// Start the server
const port = process.env.PORT || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})
