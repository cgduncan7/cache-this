# cache-this-server

Server that is coupled with cache-this-client to provide cache-this memory game.

## Technologies
- Node.js
- Typescript
- Express
- Jest/Supertest

## Explanation

### Libraries

Node.js + typescript are my go-to for creating backends. Also, this is a very frontend focused project so not much work was done on the backend. Express was used to create an API and expose an endpoint to create a new game. Jest/Supertest makes testing backends a breeze.

### Structure

The structure is pretty simple. Just an app file which exposes one endpoint on the port of the user's choosing which generates a few random numbers based on the criteria in libs/random. The files were split up this way to make each component have its own scope and make them testable.

#### Basic flow

1. App start
2. User selects difficulty
3. App requests values/solution from backend based on difficulty
4. App displays Board component and passes the values/solution to the Board
5. User views Cards and clicks on start to begin
6. Timer starts and all Cards are flipped over
7. User clicks on a Card
8. Card checks if this is the correct card; if so it stays flipped, otherwise it flips back over
9. User proceeds until all cards are flipped in correct order
10. Board alerts player they have won
11. User selects play again and goes back to #2

## Usage

### Installation
```
yarn install
```

### Testing
```
yarn test
```

### Building
```
yarn build
```

### Running
```
PORT=<port> yarn start
```

port defaults to `3000`