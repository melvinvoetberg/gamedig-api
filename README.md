# GameDig API

A RESTful API wrapper for the GameDig game server query library. This API allows you to query various game servers remotely using HTTP requests.

## Features

- Query game servers for various games (Minecraft, CS2, etc.)
- RESTful API with JSON responses
- Built-in API documentation using Scalar
- Basic authentication support
- CORS enabled
- TypeScript support

## Installation

```bash
npm install
```

## Configuration

### Authentication
The API can be protected with basic authentication by setting these environment variables:
```bash
AUTH_USERNAME=your_username
AUTH_PASSWORD=your_password
```
When set, all endpoints except `/health` will require basic authentication.

## Running the Server

Development mode:
```bash
npm run dev
```

## API Endpoints

### Query Game Server

`POST /api/query`

#### Example 1: Minecraft Server

Request:
```bash
# Without auth
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{
    "type": "minecraft",
    "host": "mc.example.com",
    "port": 25565,
    "maxRetries": 1
  }'

# With auth
curl -X POST http://localhost:3000/api/query \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "minecraft",
    "host": "mc.example.com",
    "port": 25565,
    "maxRetries": 1
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "Example Minecraft Server",
    "map": "world",
    "password": false,
    "maxplayers": 100,
    "players": [],
    "bots": [],
    "connect": "mc.example.com:25565",
    "ping": 48
  }
}
```

#### Example 2: Counter-Strike 2 Server

Request:
```bash
curl -X POST http://localhost:3000/api/query \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cs2",
    "host": "cs.example.com",
    "port": 27015,
    "maxRetries": 1
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "name": "Example CS2 Server",
    "map": "de_dust2",
    "password": false,
    "maxplayers": 32,
    "players": [
      {
        "name": "Player1",
        "raw": {
          "score": 20,
          "time": 1234
        }
      }
    ],
    "bots": [],
    "connect": "cs.example.com:27015",
    "ping": 15
  }
}
```

### API Documentation

Visit `/docs` for interactive API documentation powered by Scalar.

## Supported Games

For a list of supported game types, refer to the [GameDig documentation](https://github.com/gamedig/node-gamedig#games-list).

Common game types include:
- `cs2` - Counter-Strike 2
- `minecraft` - Minecraft
- `valheim` - Valheim
- `rust` - Rust
- `gmod` - Garry's Mod

## License

MIT

```
open http://localhost:3000