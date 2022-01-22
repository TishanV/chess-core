import { PGNObject } from "./types";

export const newPGNObject = (score: []): PGNObject => ({
  Event: "",
  White: "",
  Black: "",
  Date: "",
  score: score,
});

const stringifyPGNMeta = (meta: PGNObject) =>
  Object.keys(meta)
    .map((key) => `[${key} "${meta[key as keyof PGNObject]}"]`)
    .join("\n");

const sanWord = (san: string, i: number) =>
  i % 2 ? san : `${Math.floor(i / 2) + 1}.${san}`;

const stringifyScore = (score: []) =>
  score.map((e, i) => sanWord(e, i)).join(" ");

export const toPGN = (pgn: PGNObject): string =>
  stringifyPGNMeta(pgn) + "\n\n" + stringifyScore(pgn.score);
