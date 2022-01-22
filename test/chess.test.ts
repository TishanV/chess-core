import { Chess, ChessResult } from "../src/chess";

describe("Chess game", () => {
  it("Game 1: Foolsmate", () => {
    const game = new Chess();
    expect(game.move(76, 66)).toBeTruthy();
    expect(game.move(25, 45)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(35);
    expect(game.move(77, 57)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(67);
    expect(game.move(14, 58)).toBeTruthy();
    expect(game.board).toBe(
      "***********rnb-kbnr//pppp-ppp//--------//----p---//------Pq//-----P--//PPPPP--P//RNBQKBNR"
    );
    expect(game.currentState.enpassant).toBe(0);
    expect(game.result).toBe(ChessResult.BLACK_WON);
    expect(game.move(78, 68)).toBeFalsy();
  });
  it("Game 2: Stalemate", () => {
    const game = new Chess();
    expect(game.move(75, 65)).toBeTruthy();
    expect(game.move(21, 41)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(31);
    expect(game.move(84, 48)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(0);
    expect(game.move(11, 31)).toBeTruthy();
    expect(game.move(48, 41)).toBeTruthy();
    expect(game.currentState.castle).toBe("KQk");
    expect(game.move(28, 48)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(38);
    expect(game.move(41, 23)).toBeTruthy();
    expect(game.move(31, 38)).toBeTruthy();
    expect(game.move(78, 58)).toBeTruthy();
    expect(game.currentState.enpassant).toBe(68);
    expect(game.move(26, 36)).toBeTruthy();
    expect(game.move(23, 24)).toBeTruthy();
    expect(game.isCheck).toBeTruthy();
    expect(game.move(15, 26)).toBeTruthy();
    expect(game.move(24, 22)).toBeTruthy();
    expect(game.move(14, 64)).toBeTruthy();
    expect(game.move(22, 12)).toBeTruthy();
    expect(game.move(64, 28)).toBeTruthy();
    expect(game.move(12, 13)).toBeTruthy();
    expect(game.move(26, 37)).toBeTruthy();
    expect(game.move(13, 35)).toBeTruthy();
    expect(game.board).toBe(
      "***********-----bnr//----p-pq//----Qpkr//-------p//-------P//----P---//PPPP-PP-//RNB-KBNR"
    );
    expect(game.currentState.enpassant).toBe(0);
    expect(game.result).toBe(ChessResult.STALEMATE);
    expect(game.move(37, 47)).toBeFalsy();
  });
});
