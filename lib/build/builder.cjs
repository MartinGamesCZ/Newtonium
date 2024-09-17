#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const { mkdirSync, existsSync, cpSync } = require("fs");

let distPath = path.join(__dirname, "../dist");
let executablePath = path.join(distPath, "newtonium");
let srcPath = path.join(__dirname, "../src/index.ts");

if (os.platform() === "win32") {
  executablePath += ".exe";
}

console.log(
  `Building newtonium for ${os.platform() === "win32" ? "Windows x64" : "Linux"}...`,
);

if (!existsSync(distPath)) mkdirSync(distPath);

console.log("Copying runner.cjs to dist...");
console.log(
  path.join(__dirname, "runner.cjs") +
    " -> " +
    path.join(distPath, "runner.cjs"),
);

cpSync(path.join(__dirname, "runner.cjs"), path.join(distPath, "runner.cjs"));

console.log("Building newtonium...");
console.log(
  `bun build --minify --compile --outfile ${executablePath} ${srcPath}`,
);

const child = spawn(
  `bun build --minify --compile --outfile ${executablePath} ${srcPath}`,
  {
    stdio: "inherit",
    shell: true,
  },
);

child.on("exit", (c) => {
  process.exit(c);
});
