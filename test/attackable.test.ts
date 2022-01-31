import { listVulnerables, listCaptures } from "../src/attackable";
import { fenToBoardState } from "../src/core/boardState";

describe("list Vulnerables", () => {
  const fen =
    "rnb1k1nr/pp3ppp/3p1q2/2p1p1N1/2BbP3/8/PPP2PPP/RNBQK2R w KQkq - 0 7";
  const state = fenToBoardState(fen);
  it("all vulnerables", () => {
    expect(listVulnerables(state).sort()).toEqual([47, 72, 76]);
  });
  it("pieces on danger", () => {
    expect(listVulnerables(state, true).sort()).toEqual([76]);
  });
});

describe("list Captures", () => {
  const fen =
    "rnb1k1nr/pp3ppp/3p4/2p1p1N1/2BbPP2/8/PPP3PP/RNBQK2R w KQkq - 0 7";
  const state = fenToBoardState(fen);
  it("all captures", () => {
    expect(listCaptures(state).sort()).toEqual([26, 28, 45, 54]);
  });
  it("safe captures", () => {
    expect(listCaptures(state, true).sort()).toEqual([26]);
  });
});
