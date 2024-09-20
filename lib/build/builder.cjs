#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const { mkdirSync, existsSync, cpSync } = require("fs");
const axios = require("axios");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");

let tag = "v0.2.0";

let distPath = path.join(__dirname, "../dist");
let executablePath = path.join(distPath, "newtonium");
let srcPath = path.join(__dirname, "../src/index.ts");

if (os.platform() === "win32") {
  executablePath += ".exe";

  console.log("ERR: WINDOWS NOT SUPPORTED YET!");

  process.exit(1);
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

async function download() {
  console.log(`Downloading newtonium ${tag}...`);
  console.log(
    `https://github.com/MartinGamesCZ/Newtonium/releases/download/${tag}/newtonium`,
  );

  const bar = new cliProgress.SingleBar({
    format:
      "Newtonium |" +
      colors.cyan("{bar}") +
      "| {percentage}% || {value}/{total} MB || Speed: {speed} || ETA: {eta}s",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  let startTime = Date.now();

  let started = false;

  const { data } = await axios.get(
    `https://github.com/MartinGamesCZ/Newtonium/releases/download/${tag}/newtonium`,
    {
      responseType: "arraybuffer",

      onDownloadProgress: (progressEvent) => {
        if (!started) {
          bar.start(Math.floor(progressEvent.total / 1024 / 1024), {
            speed: "0 KB/s",
            eta: "N/A",
          });

          started = true;
        }

        bar.update(Math.floor(progressEvent.loaded / 1024 / 1024), {
          speed: `${(progressEvent.rate / 1024).toFixed(2)} KB/s`,
          eta: progressEvent.estimated + "s",
        });
      },
    },
  );

  console.log("Writing newtonium to dist...");

  const newtonium = Buffer.from(data, "binary");

  await new Promise((resolve, reject) => {
    require("fs").writeFile(executablePath, newtonium, "binary", (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Add execute permissions
  require("fs").chmodSync(executablePath, 0o755);
}

download().then(() => {
  console.log("Done. Exiting.");

  process.exit(0);
});
