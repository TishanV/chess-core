const fs = require("fs");

const jsFiles = [
  "./lib/core/utils.js",
  "./lib/core/attack.js",
  "./lib/core/pin.js",
  "./lib/core/move.js",
  "./lib/core/boardState.js",
  "./lib/core/moveable.js",
  "./lib/san.js",
  "./lib/attackable.js",
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
  "./lib/attackable.d.ts",
  "./lib/mateFinder.d.ts",
  "./lib/chess.d.ts",
  "./lib/fen.d.ts",
  "./lib/pgn.d.ts",
  "./lib/index.d.ts",
];

const jsOut = "./lib/index.js";
const dtsOut = "./lib/index.d.ts";

function combineES6(files, outFile) {
  try {
    const combined = files
      .map((file, i) =>
        fs
          .readFileSync(file, "utf-8")
          .replace(
            i === files.length - 1 ? /import.+/g : /import.+|export /g,
            ""
          )
      )
      .join("\n")
      .replace(/\n+/g, "\n");
    fs.writeFileSync(outFile, combined);
    console.log("Compiled to " + outFile);
  } catch (err) {
    console.log(err);
  }
}

function combineCJS(files, outFile) {
  try {
    const combined = files
      .map((file, i) => {
        const code = fs.readFileSync(file, "utf-8");
        const imports = code
          .match(/const .+ = require\(.+\)/g)
          ?.map((e) => e.split(" ")[1]);
        const stripCode = code
          .replace(
            i === files.length - 1
              ? /(.*(require\(.+\)).*)/g
              : /"use strict";|Object.defineProperty.+|(.*(require\(.+\)).*)|exports\..+ = [^{].+|[^\n]{0}exports\./g,
            ""
          )
          .replace(i !== files.length - 1 ? /exports\./g : /const /g, "const ");
        return (
          imports?.reduce((a, e) => a.replaceAll(e + ".", ""), stripCode) ||
          stripCode
        );
      })
      .join("\n")
      .replace(/\n+/g, "\n");
    fs.writeFileSync(outFile, combined);
    console.log("Compiled to " + outFile);
  } catch (err) {
    console.log(err);
  }
}

combineCJS(jsFiles, jsOut);
combineES6(dtsFiles, dtsOut);
