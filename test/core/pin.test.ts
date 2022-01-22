import { pinsOn, pinOnLine } from "../../src/core/pin";
import { betweenLine } from "../../src/core/utils";
import { Board } from "../../src/types";

describe("pinOnLine", () => {
  const board: Board =
    "***********------k-//pp----rp//---pq-p-//--pB-p--//--------//--PQ--P-//PP---P-P//------K-";
  it("present", () => {
    expect(pinOnLine(betweenLine(44, 17), board, "b")).toBe(35);
  });
  it("none", () => {
    expect(pinOnLine(betweenLine(27, 87), board, "w")).toBe(null);
    expect(pinOnLine(betweenLine(83, 87), board, "w")).toBe(null);
  });
});

describe("pinsOn", () => {
  const board: Board =
    "***********------k-//pp----rp//---pq-p-//--pB-p--//--------//--PQb-P-//PP---P-P//-r-N--K-";
  it("single", () => {
    const expectedPins = {
      35: [44, 26],
    };
    expect(pinsOn(board, "b")).toEqual(expectedPins);
  });
  it("multiple", () => {
    const expectedPins = {
      76: [65],
      84: [82, 83, 85, 86],
    };
    expect(pinsOn(board, "w")).toEqual(expectedPins);
  });
});
