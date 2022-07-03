# Chess Core Lite
A lightweight chess library for frontend chess apps.

# Installation
```
    npm install chess-core-lite
```

# v1.1.1 (3 Jul 2022)

## Changes
- Bug fix: assertPiece and assertSquare not defined

# Features
- Complete chess gameplay support
- Scoreboard (List of moves made)
- Checkmate move finder
- PGN support
- FEN support
- Lightweight module


# Getting Started

```javascript
    import {
        Chess, ChessResult,findMate,
        toFEN, toPGN, fromPGN, newPGNObject, } from 'chess-core-lite';
    
    // New game with default fen
    const game = new Chess(); 

    // New game with custom fen
    const fen = '8/2q2P2/p1R5/1Q1p4/2p3pK/1P1R4/3P1p1P/k6N w - - 0 1';
    const game2 = new Chess(fen);

    // make a move by SAN
    game.moveSAN('e4');
    // make a move by position
    game.move(75, 55);
    // undo move
    game.undoMove();
    // goto nth move
    game.goto(1); // go to 1st move
    game.goto(-1); // go to last move
    // NOTE: if a move made on nth state then all moves made thereafter are cleared.

    // get board state
    const state = game.currentState;
    const lastState = game.lastState; // returns last state irrespective of current state user goes.

    // List the moves made
    const moves = game.score;

    // Check the states of game
    const isGameActive = game.result === ChessResult.GAME_ON;
    game.isCheck
    game.isCheckmate
    

    // Get FEN
    const fen = toFEN(game.currentState);

    // Get PGN
    const pgnObject = newPGNObject(game.score);
    const pgnObject['Event'] = 'Bob v Marley';
    const pgnObject['Date'] = '10-01-21';
    const pgn = toPGN(pgnObject);

    // Load PGN
    const pgnObjects = fromPGN('[Event "BvS"]\n1. e4 e5 2. Nc3 Nf6');
    game.load(pgnObjects[0].score);

    // Find Checkmate move
    const mates = findMate(game.currentState);
    if(mates.length) game.move(...mates[0]); // Do the checkmate move
```

## API

> API docs coming soon

### Chess (class)
- result : ChessResult
- score : string[]
- currentState: BoardState
- lastState: BoardState
- board: Board
- moves: Moves
- isCheck : boolean 
- isCheckmate : boolean 
- isStalemate : boolean 
- isThreefold : boolean 
- isFiftyMove : boolean
- isInsufficient : boolean
- load(score: string[], [fen: string]) : boolean
- move(from: number, to: number, [promotion: string]) : boolean
- moveSAN(san: string) : boolean
- undoMove() : void
- claimDraw() : ChessResult
- reset(): void

### ChessResult (Enum)
- GAME_ON = 0
- WHITE_WON = 1
- BLACK_WON = 10
- STALEMATE = 100
- THREEFOLD_DRAW = 102
- FIFTYMOVE_DRAW = 103
- INSUFFICIENT_DRAW = 104
- CLAIMED_DRAW = 105

### Other Types
Board alias string: a string refence to positions of board

Moves alias object: containing list of legal moves for the particular board state.



## Contribute

```
    git clone https://github.com/TishanV/chess-core.git
    cd chess-core
    npm install
```

**Prefer Typescript**

> Developer guide coming soon.