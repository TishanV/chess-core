import {
  fenPositionsToBoard,
  composeFEN,
  fenToBoardState,
} from "../../src/core/boardState";
import { BoardState, Moves } from "../../src/types";

test("fenPositionsToBoard: convert positions of FEN to Board", () => {
  const expectedBoard =
    "***********rnbqkbnr//pppppppp//--------//--------//--------//--------//PPPPPPPP//RNBQKBNR";
  expect(
    fenPositionsToBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  ).toBe(expectedBoard);
});

test("composeFEN: deconstruct FEN to an object", () => {
  const board =
    "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  const player = "b";
  const castle = "KQkq";
  const enpassant = 65;
  const halfMove = 0;
  const fullMove = 1;
  const expectedFEN = { board, player, castle, enpassant, halfMove, fullMove };
  expect(
    composeFEN("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP-PPP/RNBQKBNR b KQkq e3 0 1")
  ).toEqual(expectedFEN);
});

test("fenToStateBoard", () => {
  const board =
    "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  const player = "b";
  const castle = "KQkq";
  const enpassant = 65;
  const halfMove = 0;
  const fullMove = 1;
  const checkline: any[] = [];
  const moves: Moves = {
    11: [],
    12: [31, 33],
    13: [],
    14: [],
    15: [],
    16: [],
    17: [36, 38],
    18: [],
    21: [31, 41],
    22: [32, 42],
    23: [33, 43],
    24: [34, 44],
    25: [35, 45],
    26: [36, 46],
    27: [37, 47],
    28: [38, 48],
  };
  const expectedState: BoardState = {
    board,
    player,
    castle,
    enpassant,
    halfMove,
    fullMove,
    attackMap: [],
    checkline,
    moves,
  };
  const state = fenToBoardState(
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP-PPP/RNBQKBNR b KQkq e3 0 1"
  );
  for (let c of state.checkline) c.sort();
  for (let p in state.moves) state.moves[p].sort();
  expect({ ...state, attackMap: [] }).toEqual(expectedState);
});
