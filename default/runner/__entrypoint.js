const { exec, spawn } = require("child_process");
const { existsSync, writeFileSync } = require("fs");
const path = require("path");

const platform = process.platform == "win32" ? "windows" : "linux";
const bun = path.join(
  process.cwd(),
  `./newtonium_binaries/bun${platform == "windows" ? ".exe" : ""}`
);

if (!existsSync("./___initialized")) {
  await new Promise((r) =>
    exec(`${bun} install @newtonium/core`, (err, stdout, stderr) => {
      r();
    })
  );

  writeFileSync("./___initialized", "");
}

await new Promise((r) => {
  const proc = spawn(
    `${bun} run node_modules/@newtonium/core/src/entrypoint.ts index.js`,
    {
      shell: true,
      stdio: "inherit",
      env: {
        ...process.env,
        GTK_DEBUG: "interactive",
      },
    }
  );

  proc.on("exit", r);
});
