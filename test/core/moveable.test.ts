import {
  putPiece,
  removePiece,
  movePiece,
  castleStrip,
  castleCheck,
  pawnCheck,
  halfMoveCheck,
  fullMoveCheck,
} from "../../src/core/moveable";

test("putPiece: put piece on board (might replace existing one)", () => {
  const board =
    "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  const expectedBoard =
    "***********rnbqkbnr//pppppppp//--------//------r-//----P---//--------//PPPP-PPP//RNBQKBNR";
  expect(putPiece("r", 47, board)).toBe(expectedBoard);
});

test("removePiece: remove piece on board", () => {
  const board =
    "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  const expectedBoard =
    "***********rnbqkb-r//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  expect(removePiece(17, board)).toBe(expectedBoard);
});

test("movePiece: put piece on board (might replace existing one)", () => {
  const board =
    "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  const expectedBoard =
    "***********rnbqkb-r//pppppnpp//--------//--------//----P---//--------//PPPP-PPP//RNBQKBNR";
  expect(movePiece([17, 26], board)).toBe(expectedBoard);
});

test("castleStrip: remove castle if respective move made", () => {
  expect(castleStrip("r", [18, 48], "KQkq")).toBe("KQq");
  expect(castleStrip("r", [11, 12], "KQkq")).toBe("KQk");
  expect(castleStrip("k", [15, 14], "KQkq")).toBe("KQ");
  expect(castleStrip("R", [88, 58], "KQkq")).toBe("Qkq");
  expect(castleStrip("R", [81, 41], "KQkq")).toBe("Kkq");
  expect(castleStrip("K", [85, 74], "KQkq")).toBe("kq");
});

describe("castleCheck: check castle move", () => {
  it("White King side", () => {
    const board =
      "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--KR";
    const expectedBoard =
      "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ-RK-";
    expect(castleCheck(board, "KQkq", [85, 87])).toEqual([expectedBoard, "kq"]);
  });
  it("White Queen side", () => {
    const board =
      "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//R-K----R";
    const expectedBoard =
      "***********rnbqkbnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//--KR---R";
    expect(castleCheck(board, "KQkq", [85, 83])).toEqual([expectedBoard, "kq"]);
  });
  it("Black King side", () => {
    const board =
      "***********rnbq--kr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--KR";
    const expectedBoard =
      "***********rnbq-rk-//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--KR";
    expect(castleCheck(board, "KQkq", [15, 17])).toEqual([expectedBoard, "KQ"]);
  });
  it("Black Queen side", () => {
    const board =
      "***********r-k--bnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--K-";
    const expectedBoard =
      "***********--kr-bnr//pppppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--K-";
    expect(castleCheck(board, "Kkq", [15, 13])).toEqual([expectedBoard, "K"]);
  });
});

describe("pawnCheck: check for pawn special moves", () => {
  it("set en-passant", () => {
    const board =
      "***********-----bnr//pp-ppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--K-";
    const expectedBoard =
      "***********-----bnr//pp-ppppp//--------//--------//----P---//--------//PPPP-PPP//RNBQ--K-";
    expect(pawnCheck(board, "w", 0, "Queen", [75, 55])).toEqual([
      expectedBoard,
      65,
    ]);
  });
  it("en-passant", () => {
    const board =
      "***********-----bnr//pp-ppppp//--------//--------//----P---//----p---//PPPP-PPP//RNBQ--K-";
    const expectedBoard =
      "***********-----bnr//pp-ppppp//--------//--------//--------//----p---//PPPP-PPP//RNBQ--K-";
    expect(pawnCheck(board, "b", 65, "Queen", [54, 65])).toEqual([
      expectedBoard,
      0,
    ]);
  });
  it("promotion", () => {
    const board =
      "***********-----bnr//pp-ppppp//--------//--------//--------//--------//PPPP-PP-//RNBQ--Kp";
    const expectedBoard =
      "***********-----bnr//pp-ppppp//--------//--------//--------//--------//PPPP-PP-//RNBQ--Kq";
    expect(pawnCheck(board, "b", 0, "Queen", [78, 88])).toEqual([
      expectedBoard,
      0,
    ]);
  });
});

test("halfMoveCheck", () => {
  const board =
    "***********-----bnr//pppppppp//--------//--------//--------//--------//PPPP-PP-//RNBQ--Kp";
  expect(halfMoveCheck(3, board, [22, 32])).toBe(0);
});

test("fullMoveCheck", () => {
  expect(fullMoveCheck(3, "b")).toBe(4);
  expect(fullMoveCheck(3, "w")).toBe(3);
});
