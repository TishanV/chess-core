import { findMate } from "../src/mateFinder";
import { fenToBoardState } from "../src/core/boardState";

describe("Find Checkmate on single move", () => {
  it("fools mate position", () => {
    const fen =
      "rnbqkbnr/pppp-ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2";
    expect(findMate(fenToBoardState(fen))).toEqual([[14, 58]]);
  });

  it("checkmate by promotion", () => {
    const fen = "6k1/P4ppp/8/8/8/8/8/3BK3 w - - 0 2";
    expect(findMate(fenToBoardState(fen))).toEqual([[21, 11]]);
  });

  it("sample 1", () => {
    const fen = "r3rk2/p1p1Rp2/1p6/5b2/1PB2K2/8/PB1P4/6R1 w - - 0 2";
    expect(findMate(fenToBoardState(fen))).toEqual([[25, 26]]);
  });
});
