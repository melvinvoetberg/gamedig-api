export interface QueryOptions {
  type: string;
  host: string;
  port?: number;
  maxAttempts?: number;
}

export interface Player {
  name?: string;
  raw?: Record<string, unknown>;
}

export interface GamedigResult {
  name: string;
  map: string;
  password: boolean;
  maxplayers: number;
  players: Player[];
  bots: Player[];
  connect: string;
  ping: number;
  raw?: Record<string, unknown>;
}