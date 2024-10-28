#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");
const os = require("os");

let executablePath = path.join(os.homedir(), "/.newtonium/newtonium");

if (os.platform() === "win32") {
  executablePath += ".exe";
}

const child = spawn(executablePath, process.argv.slice(2), {
  stdio: "inherit",
  cwd: process.cwd(),
  env: {
    ...process.env,
    NEWTONIUM_CLI_DIR: __dirname,
  },
});

child.on("exit", (c) => {
  process.exit(c);
});
