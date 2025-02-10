import { z } from 'zod';
import type { GamedigResult } from '../types/gamedig.js';

export const querySchema = z.object({
  type: z.string().describe('The game type to query (e.g., minecraft, cs2, etc.)'),
  host: z.string().describe('The hostname or IP address of the game server'),
  port: z.number().optional().describe('The port number of the game server (if different from default)'),
  maxRetries: z.number().optional().default(1).describe('Maximum number of query retries'),
});

export type QueryRequest = z.infer<typeof querySchema>;
export type QueryResponse = {
  success: boolean;
  data?: GamedigResult;
  error?: string;
}; 