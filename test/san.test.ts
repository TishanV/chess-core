import { toCordsFromSAN, toSANMove } from "../src/san";
import { fenToBoardState } from "../src/core/boardState";

describe("toCordsFromSAN", () => {
  it("pawn move", () => {
    const state = fenToBoardState(
      "rnbqkbnr/pppp-ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2"
    );
    expect(toCordsFromSAN("b5", state)).toEqual([22, 42]);
  });
  it("castle move", () => {
    const state = fenToBoardState(
      "r---kbnr/pppp-ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2"
    );
    expect(toCordsFromSAN("O-O-O", state)).toEqual([15, 13]);
  });
});

describe("toSANMove", () => {
  it("pawn enpassant move", () => {
    const beforestate = fenToBoardState(
      "rnbqkbnr/pppp-ppp/8/4p3/5pP1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2"
    );
    const afterstate = fenToBoardState(
      "rnbqkbnr/pppp-ppp/8/4p3/8/5Pp1/PPPPP2P/RNBQKBNR w KQkq - 0 2"
    );
    expect(toSANMove([56, 67], beforestate, afterstate)).toEqual("fxg3");
  });
  it("castle move", () => {
    const beforestate = fenToBoardState(
      "r---kbnr/pppp-ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2"
    );
    const afterstate = fenToBoardState(
      "--kr-bnr/pppp-ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR w KQ g3 0 2"
    );
    expect(toSANMove([15, 13], beforestate, afterstate)).toEqual("O-O-O");
  });
});
