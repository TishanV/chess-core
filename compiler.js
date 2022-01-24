import { readFileSync, writeFileSync } from "fs";

const jsFiles = [
  "./lib/core/utils.js",
  "./lib/core/attack.js",
  "./lib/core/pin.js",
  "./lib/core/move.js",
  "./lib/core/boardState.js",
  "./lib/core/moveable.js",
  "./lib/san.js",
  "./lib/mateFinder.js",
  "./lib/chess.js",
  "./lib/fen.js",
  "./lib/pgn.js",
  "./lib/index.js",
];

const dtsFiles = [
  "./lib/types.d.ts",
  "./lib/core/utils.d.ts",
  "./lib/core/attack.d.ts",
  "./lib/core/pin.d.ts",
  "./lib/core/move.d.ts",
  "./lib/core/boardState.d.ts",
  "./lib/core/moveable.d.ts",
  "./lib/san.d.ts",
  "./lib/mateFinder.d.ts",
  "./lib/chess.d.ts",
  "./lib/fen.d.ts",
  "./lib/pgn.d.ts",
  "./lib/index.d.ts",
];

const jsOut = "./lib/index.js";
const dtsOut = "./lib/index.d.ts";

function combine(files, outFile) {
  try {
    const combined = files
      .map((file, i) =>
        readFileSync(file, "utf-8").replace(
          i === files.length - 1 ? /import.+/g : /import.+|export /g,
          ""
        )
      )
      .join("\n")
      .replace(/\n+/g, "\n");
    writeFileSync(outFile, combined);
    console.log("Compiled to " + outFile);
  } catch (err) {
    console.log(err);
  }
}

combine(jsFiles, jsOut);
combine(dtsFiles, dtsOut);
