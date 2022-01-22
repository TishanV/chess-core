import {
  toFEN,
  validateBoard,
  validatePlayer,
  validateCastle,
  validateEnPassant,
  validateHalfMove,
  validateFullfMove,
} from "../src/fen";
import { FENState } from "../src/types";

describe("toFEN: convert fen object/BoardState to fen string", () => {
  it("default", () => {
    const fenObj: FENState = {
      board:
        "***********rnbqkbnr//pppppppp//--------//--------//--------//--------//PPPPPPPP//RNBQKBNR",
      player: "w",
      castle: "KQkq",
      enpassant: 0,
      halfMove: 0,
      fullMove: 1,
    };
    expect(toFEN(fenObj)).toBe(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
  });
});

test("validateBoard", () => {
  expect(
    validateBoard("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  ).toBeTruthy();
  expect(
    validateBoard("rnbqkbpr/p-pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  ).toBeFalsy();
  expect(
    validateBoard("rnbqkbnr/pppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
  ).toBeFalsy();
  expect(
    validateBoard("rnbqkbnr/pppppp2/8/8/8/K7/PPPPPPPP/RNBQKBNR")
  ).toBeFalsy();
});

test("validatePlayer", () => {
  expect(validatePlayer("w")).toBeTruthy();
  expect(validatePlayer("b")).toBeTruthy();
  expect(validatePlayer("-")).toBeFalsy();
});

test("validateCastle", () => {
  expect(validateCastle("KQkq")).toBeTruthy();
  expect(validateCastle("-")).toBeTruthy();
  expect(validateCastle("KKQkq")).toBeFalsy();
  expect(validateCastle("K-")).toBeFalsy();
});

test("validateEnPassant", () => {
  expect(validateEnPassant("e3")).toBeTruthy();
  expect(validateEnPassant("a6")).toBeTruthy();
  expect(validateEnPassant("e5")).toBeFalsy();
  expect(validateEnPassant("-")).toBeFalsy();
});

test("validateHalfMove", () => {
  expect(validateHalfMove("20")).toBeTruthy();
  expect(validateHalfMove("60")).toBeFalsy();
  expect(validateHalfMove("w")).toBeFalsy();
});

test("validateFullMove", () => {
  expect(validateFullfMove("12", "0")).toBeTruthy();
  expect(validateFullfMove("12", "30")).toBeFalsy();
  expect(validateFullfMove("0", "0")).toBeFalsy();
});
