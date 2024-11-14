const { spawn } = require("child_process");
const { existsSync } = require("fs");
const path = require("path");

const main_file = path.join(process.cwd(), process.argv[2]);
const config_file = path.join(process.cwd(), "newtonium.config.mjs");

let config = {};

if (existsSync(config_file)) config = require(config_file).default;

spawn(`bun run ${main_file}`, {
  shell: true,
  stdio: "inherit",
  env: {
    ...process.env,
    ...{
      NEWTONIUM_ROOT: process.cwd(),
      GTK_DEBUG: config?.development?.enableInspector
        ? "interactive"
        : undefined,
    },
  },
});
