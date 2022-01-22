import { pieceMove } from "../../src/core/move";
import { getAttackMap, checklinesOf } from "../../src/core/attack";
import { pinsOn } from "../../src/core/pin";

type Board = string;

describe("pieceMove", () => {
  const board: Board =
    "***********------k-//pp----rp//---pq-p-//--pB-p--//--------//--PQb-P-//PP---P-P//-r-N--K-";
  const attackMap = getAttackMap(board);
  const blackPins = pinsOn(board, "b");
  const whitePins = pinsOn(board, "w");
  it("King Move", () => {
    const expectedMoves = [16, 18, 26];
    expect(
      pieceMove(17, "b", board, "", 0, [], blackPins, attackMap).sort()
    ).toEqual(expectedMoves);
  });
  it("Queen Move", () => {
    const expectedMoves = [31, 42, 46, 53, 54, 55, 65, 73, 74, 75, 82, 86];
    expect(
      pieceMove(64, "w", board, "", 0, [], whitePins, attackMap).sort()
    ).toEqual(expectedMoves);
  });
  it("Pawn Move", () => {
    const expectedMoves = [52, 62];
    expect(
      pieceMove(72, "w", board, "", 0, [], whitePins, attackMap).sort()
    ).toEqual(expectedMoves);
  });
  it("Pin Move", () => {
    const expectedMoves = [26, 44];
    expect(
      pieceMove(35, "b", board, "", 0, [], blackPins, attackMap).sort()
    ).toEqual(expectedMoves);
  });
  it("Check Move", () => {
    const board: Board =
      "***********------k-//pp----rp//---pq-p-//--pB-p--//--------//--PQb-P-//PP-----P//-r-N--K-";
    const attackMap = getAttackMap(board);
    const expectedMoves = [65];
    expect(
      pieceMove(
        64,
        "w",
        board,
        "",
        0,
        checklinesOf(board, "w", attackMap),
        [],
        attackMap
      ).sort()
    ).toEqual(expectedMoves);
  });
  it("On Check, King cannot move behind checklines", () => {
    const board: Board =
      "***********------k-//pp----rp//---pq-p-//--pB-p--//--------//--PQb-P-//PPr--K-P//--------";
    const attackMap = getAttackMap(board);
    const expectedMoves = [66, 85, 86];
    const checkline = checklinesOf(board, "w", attackMap);
    expect(
      pieceMove(76, "w", board, "", 0, checkline, [], attackMap).sort()
    ).toEqual(expectedMoves);
  });
});
