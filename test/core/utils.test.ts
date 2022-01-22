import {
  assertPiece,
  assertSquare,
  betweenLine,
  firstNum,
  gcd,
  isPromotionRank,
  lastNum,
  mapPos,
  mapSanPos,
  opponent,
  playerOf,
  sameColorPos,
} from "../../src/core/utils";

// Math functions

test("firstNum: returns first digit (associated to rank) of a board position.)", () => {
  expect(firstNum(34)).toBe(3);
});

test("lastNum: returns last digit (associated to file) of a board position.)", () => {
  expect(lastNum(34)).toBe(4);
});

test("gcd: return gcd of numbers, used for getting magnitude of vector)", () => {
  expect(gcd(5, 6)).toBe(1);
  expect(gcd(6, 6)).toBe(6);
});

test("mapPos: map san position to board position", () => {
  expect(mapPos("e4")).toBe(55);
  expect(mapPos("h7")).toBe(28);
});

test("mapSanPos: map board position to san position", () => {
  expect(mapSanPos(55)).toBe("e4");
  expect(mapSanPos(28)).toBe("h7");
});

test("sameColorPos: check whether two board position are same color", () => {
  expect(sameColorPos(45, 76)).toBeTruthy();
  expect(sameColorPos(32, 68)).toBeFalsy();
});

test("isPromotionRank: check whether whether pawn position is in promotion rank", () => {
  expect(isPromotionRank(15, "w")).toBeTruthy();
  expect(isPromotionRank(82, "b")).toBeTruthy();
  expect(isPromotionRank(25, "w")).toBeFalsy();
  expect(isPromotionRank(72, "b")).toBeFalsy();
});

test("opponent: return opponent player", () => {
  expect(opponent("w")).toBe("b");
  expect(opponent("b")).toBe("w");
});

test("playerOf: return player of the piece", () => {
  expect(playerOf("k")).toBe("b");
  expect(playerOf("Q")).toBe("w");
});

describe("assertPiece: check piece matches", () => {
  it("isKing", () => {
    expect(assertPiece.isKing("k")).toBeTruthy();
  });
  it("isQueen", () => {
    expect(assertPiece.isQueen("Q")).toBeTruthy();
  });
  it("isRook", () => {
    expect(assertPiece.isRook("r")).toBeTruthy();
  });
  it("isBishop", () => {
    expect(assertPiece.isBishop("B")).toBeTruthy();
  });
  it("isKnight", () => {
    expect(assertPiece.isKnight("n")).toBeTruthy();
  });
  it("isPawn", () => {
    expect(assertPiece.isPawn("P")).toBeTruthy();
  });
  it("isPlayer", () => {
    expect(assertPiece.isPlayer("Q", "w")).toBeTruthy();
  });
  it("isOpponent", () => {
    expect(assertPiece.isOpponent("r", "w")).toBeTruthy();
  });
  it("isWhite", () => {
    expect(assertPiece.isWhite("Q")).toBeTruthy();
  });
  it("isBlack", () => {
    expect(assertPiece.isBlack("p")).toBeTruthy();
  });
});

describe("assertPosition: check whether at position on board", () => {
  it("empty", () => {
    expect(assertSquare.isEmpty("-")).toBeTruthy();
  });
  it("hasPiece", () => {
    expect(assertSquare.hasPiece("Q")).toBeTruthy();
  });
});

describe("betweenLine: return linear positions between two points", () => {
  it("linear", () => {
    expect(betweenLine(18, 81)).toEqual([27, 36, 45, 54, 63, 72]);
    expect(betweenLine(63, 67)).toEqual([64, 65, 66]);
  });
  it("non-linear", () => {
    expect(betweenLine(21, 48)).toEqual([]);
    expect(betweenLine(65, 77)).toEqual([]);
  });
});
