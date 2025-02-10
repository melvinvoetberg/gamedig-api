import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { GameDig } from 'gamedig';
import { querySchema, type QueryRequest, type QueryResponse } from '../schemas/query.js';
import type { GamedigResult } from '../types/gamedig.js';

const query = new Hono();

query.post('/', zValidator('json', querySchema), async (c) => {
  const { type, host, port, maxRetries } = c.req.valid('json') as QueryRequest;

  try {
    const result = await GameDig.query({
      type,
      host,
      port,
      maxRetries,
    });

    const response: QueryResponse = {
      success: true,
      data: result as GamedigResult,
    };

    return c.json(response);
  } catch (error) {
    const response: QueryResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };

    return c.json(response, 400);
  }
});

export default query; 