import {
  getAttackMap,
  positionAdd,
  positionAddTillEncounter,
  getKingAttacks,
  getQueenAttacks,
  getRookAttacks,
  getBishopAttacks,
  getKnightAttacks,
  getPawnAttacks,
  attackersOn,
} from "../../src/core/attack";
import { AttackMap } from "../../src/types";

import { assertPiece, assertSquare, filterBoard } from "../../src/core/utils";

type Board = string;

describe("filterBoard", () => {
  const board: Board =
    "***********rnbqkbnr//pppppppp//--------//--------//--------//--------//PPPPPPPP//RNBQKBNR";
  it("by empty", () => {
    const expectedPositions = [
      31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 51, 52,
      53, 54, 55, 56, 57, 58, 61, 62, 63, 64, 65, 66, 67, 68,
    ];
    const positons = filterBoard(board, assertSquare.isEmpty);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by any piece", () => {
    const expectedPositions = [
      11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 71, 72,
      73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 86, 87, 88,
    ];
    const positons = filterBoard(board, assertSquare.hasPiece);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by white piece", () => {
    const expectedPositions = [
      71, 72, 73, 74, 75, 76, 77, 78, 81, 82, 83, 84, 85, 86, 87, 88,
    ];
    const positons = filterBoard(board, assertPiece.isWhite);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by black piece", () => {
    const expectedPositions = [
      11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28,
    ];
    const positons = filterBoard(board, assertPiece.isBlack);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by King", () => {
    const expectedPositions = [15, 85];
    const positons = filterBoard(board, assertPiece.isKing);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by Queen", () => {
    const expectedPositions = [14, 84];
    const positons = filterBoard(board, assertPiece.isQueen);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by Rook", () => {
    const expectedPositions = [11, 18, 81, 88];
    const positons = filterBoard(board, assertPiece.isRook);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by Bishop", () => {
    const expectedPositions = [13, 16, 83, 86];
    const positons = filterBoard(board, assertPiece.isBishop);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by Knight", () => {
    const expectedPositions = [12, 17, 82, 87];
    const positons = filterBoard(board, assertPiece.isKnight);
    expect(positons.sort()).toEqual(expectedPositions);
  });

  it("by Pawn", () => {
    const expectedPositions = [
      21, 22, 23, 24, 25, 26, 27, 28, 71, 72, 73, 74, 75, 76, 77, 78,
    ];
    const positons = filterBoard(board, assertPiece.isPawn);
    expect(positons.sort()).toEqual(expectedPositions);
  });
});

describe("positionAdd", () => {
  it("inside board", () => {
    expect(positionAdd(21, 33)).toBe(54);
  });
  it("outside board", () => {
    expect(positionAdd(21, 8)).toBe(null);
  });
});

describe("positionAddTillEncounter", () => {
  const board: Board =
    "***********rnbqkbnr//ppppppp-//--------//---p----//----kP--//--------//-PPPPPPP//RNBQ-BNR";
  it("without any piece", () => {
    const expectedPositions = [28, 37, 46];
    expect(positionAddTillEncounter(55, -9, board).sort()).toEqual(
      expectedPositions
    );
  });
  it("with piece", () => {
    const expectedPositions = [56];
    expect(positionAddTillEncounter(55, 1, board).sort()).toEqual(
      expectedPositions
    );
  });
});

describe("getPieceAttacks", () => {
  const centerPosition = 55; // 'e4'
  const board: Board =
    "***********rnbqkbnr//ppppppp-//--------//---p----//----kP--//--------//-PPPPPPP//RNBQ-BNR";
  it("by King at center", () => {
    const expectedAttackPositions = [44, 45, 46, 54, 56, 64, 65, 66];
    const attackPositions = getKingAttacks(centerPosition);
    expect(attackPositions.sort()).toEqual(expectedAttackPositions);
  });
  it("by Queen at center", () => {
    const expectedPositions = [
      25, 28, 35, 37, 44, 45, 46, 51, 52, 53, 54, 56, 64, 65, 66, 73, 75, 77,
    ];
    expect(getQueenAttacks(centerPosition, board).sort()).toEqual(
      expectedPositions
    );
  });
  it("by Rook at center", () => {
    const expectedPositions = [25, 35, 45, 51, 52, 53, 54, 56, 65, 75];
    expect(getRookAttacks(centerPosition, board).sort()).toEqual(
      expectedPositions
    );
  });
  it("by Bishop at center", () => {
    const expectedPositions = [28, 37, 44, 46, 64, 66, 73, 77];
    expect(getBishopAttacks(centerPosition, board).sort()).toEqual(
      expectedPositions
    );
  });
  it("by Knight at center", () => {
    const expectedAttackPositions = [34, 36, 43, 47, 63, 67, 74, 76];
    const attackPositions = getKnightAttacks(centerPosition);
    expect(attackPositions.sort()).toEqual(expectedAttackPositions);
  });
  it("by White Pawn at center", () => {
    const expectedAttackPositions = [44, 46];
    const attackPositions = getPawnAttacks(centerPosition, "w");
    expect(attackPositions.sort()).toEqual(expectedAttackPositions);
  });
  it("by Black Pawn at center", () => {
    const expectedAttackPositions = [64, 66];
    const attackPositions = getPawnAttacks(centerPosition, "b");
    expect(attackPositions.sort()).toEqual(expectedAttackPositions);
  });
});

describe("getAttackMap", () => {
  it("on board positons test 1: default board", () => {
    const board: Board =
      "***********rnbqkbnr//pppppppp//--------//--------//--------//--------//PPPPPPPP//RNBQKBNR";
    const expectedMap: AttackMap = {
      11: [12, 21],
      12: [24, 31, 33],
      13: [22, 24],
      14: [13, 15, 23, 24, 25],
      15: [14, 16, 24, 25, 26],
      16: [25, 27],
      17: [25, 36, 38],
      18: [17, 28],
      21: [32],
      22: [31, 33],
      23: [32, 34],
      24: [33, 35],
      25: [34, 36],
      26: [35, 37],
      27: [36, 38],
      28: [37],
      71: [62],
      72: [61, 63],
      73: [62, 64],
      74: [63, 65],
      75: [64, 66],
      76: [65, 67],
      77: [66, 68],
      78: [67],
      81: [71, 82],
      82: [61, 63, 74],
      83: [72, 74],
      84: [73, 74, 75, 83, 85],
      85: [74, 75, 76, 84, 86],
      86: [75, 77],
      87: [66, 68, 75],
      88: [78, 87],
    };
    const map: AttackMap = getAttackMap(board);
    for (let key in map) {
      map[key].sort();
    }
    expect(map).toEqual(expectedMap);
  });
});

describe("attackersOn", () => {
  const board: Board =
    "***********rnbqkbnr//pppppppp//--------//--------//--------//--------//PPPPPPPP//RNBQKBNR";
  it("position 1", () => {
    const expectedAttackers = [84, 85, 86, 87];
    const attackers = attackersOn(75, getAttackMap(board));
    expect(attackers.sort()).toEqual(expectedAttackers);
  });
});
