import { BoardPosition, BoardState, PromotionPiece } from "./types";
import { sameColorPos } from "./core/utils";
import { fenToBoardState } from "./core/boardState";
import { doMove } from "./core/moveable";
import { promotionOf, toCordsFromSAN, toSANMove } from "./san";

export enum ChessResult {
  GAME_ON = 0,
  WHITE_WON = 10,
  BLACK_WON = 100,
  STALEMATE = 101,
  THREEFOLD_DRAW = 102,
  FIFTYMOVE_DRAW = 103,
  INSUFFICIENT_DRAW = 104,
  CLAIMED_DRAW = 105,
}

const defaultFEN: string =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export class Chess {
  private _states: BoardState[];
  private _current: number;
  private _score: string[];
  private _result: ChessResult;

  constructor(fen: string = defaultFEN) {
    this._states = [fenToBoardState(fen)];
    this._current = 0;
    this._score = ["-"];
    this._result = ChessResult.GAME_ON;
  }

  public get result(): ChessResult {
    return this._result;
  }

  public get score(): string[] {
    return this._score.slice(1);
  }

  public goto(i: number) {
    if (i < 0) i = this._states.length + i;
    if (i < 0 || i >= this._states.length) return;
    this._current = i;
  }

  public get currentState() {
    return this._states[this._current];
  }

  public get lastState() {
    return this._states[this._states.length - 1];
  }

  public get board() {
    return this._states[this._current].board;
  }

  public get moves() {
    return this._states[this._current].moves;
  }

  public claimDraw() {
    return (this._result = ChessResult.CLAIMED_DRAW);
  }

  public load(score: string[], fen = defaultFEN) {
    this.reset();
    this._states = [fenToBoardState(fen)];
    return score.every((san) => this.moveSAN(san));
  }

  public moveSAN(san: string) {
    const cords = toCordsFromSAN(san, this.currentState);
    return cords ? this.move(...cords, promotionOf(san)) : false;
  }

  public move(
    from: BoardPosition,
    to: BoardPosition,
    promotion: PromotionPiece = "Q"
  ) {
    if (this._result !== ChessResult.GAME_ON) return false;
    const newState = doMove(this._states[this._current], [from, to], promotion);
    if (newState !== undefined) {
      if (this._current !== this._states.length - 1) {
        this._states.splice(this._current + 1);
        this._score.splice(this._current + 1);
      }
      this._score.push(toSANMove([from, to], this.currentState, newState));
      this._states.push(newState);
      this._current = this._states.length - 1;
      this.resultCheck();
      return true;
    }
    return false;
  }

  public undoMove() {
    this._states.length > 1
      ? this._states.pop() &&
        this._score.pop() &&
        (this._current = this._states.length - 1)
      : null;
  }

  public reset() {
    this._states.length = 1;
    this._score.length = 1;
    this._current = 0;
    this._result = ChessResult.GAME_ON;
  }

  public get isCheck() {
    return this.currentState.checkline.length > 0;
  }

  private get noMoves() {
    return Object.values(this.currentState.moves).every((e) => !e.length);
  }

  public get isCheckmate() {
    return this.isCheck && this.noMoves;
  }

  public get isStalemate() {
    return !this.isCheck && this.noMoves;
  }

  public get isFiftyMove() {
    return this.currentState.halfMove >= 50;
  }

  public get isThreefold() {
    return (
      this._states.length -
        Array.from(
          new Set(
            this._states.map(
              (e) => `${e.board} ${e.player} ${e.castle} ${e.enpassant}`
            )
          )
        ).length >=
      2
    );
  }

  public get isInsufficient() {
    return (
      (!this.board.match(/[qQrRpP]/g) &&
        (this.board.match(/[bBnN]/g)?.length || 0) < 2) ||
      (this.board.match(/[bBnN]/g)?.length === 2 &&
        this.board.match(/[b]/g)?.length === 1 &&
        this.board.match(/[B]/g)?.length === 1 &&
        sameColorPos(this.board.indexOf("b"), this.board.indexOf("B")))
    );
  }

  private resultCheck() {
    if (this.isCheckmate)
      return (this._result =
        this.currentState.player === "b"
          ? ChessResult.WHITE_WON
          : ChessResult.BLACK_WON);
    if (this.isStalemate) return (this._result = ChessResult.STALEMATE);
    if (this.isThreefold) return (this._result = ChessResult.THREEFOLD_DRAW);
    if (this.isFiftyMove) return (this._result = ChessResult.FIFTYMOVE_DRAW);
    if (this.isInsufficient)
      return (this._result = ChessResult.INSUFFICIENT_DRAW);
  }
}
