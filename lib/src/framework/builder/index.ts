import { $, spawnSync } from "bun";
import { cpSync, rmSync } from "fs";
import path from "path";
import bundle from "@newtonium/bundler";

export enum Platform {
  "windows" = "windows",
  "linux" = "linux",
}

const platforms = {
  [Platform.linux]: {
    bun_target: "bun-linux-x64",
    output: "AppRun",
  },
  [Platform.windows]: {
    bun_target: "bun-windows-x64",
    output: "AppRun.exe",
  },
};

export async function buildApp(root: string, platform: Platform) {
  const src = path.join(root, "src");

  console.log("Building view...");
  await buildRenderer(root);

  console.log("Copying image files...");
  copyRunner(root);

  console.log("Compiling source...");
  await compile(root, platform);

  console.log("Cleaning up...");
  removeJunk(root);

  console.log("Packaging app...");
  await packageApp(root, platform);

  console.log("Done!");
}

async function buildRenderer(root: string) {
  spawnSync({
    cmd: ["bun", "build:renderer"],
    cwd: root,
    stdio: ["inherit", "inherit", "inherit"],
  });
}

function copyRunner(root: string) {
  const dist = path.join(root, "dist");
  const default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/runner",
  );

  cpSync(default_path, dist, {
    recursive: true,
  });
}

async function compile(root: string, platform_id: Platform) {
  const dist = path.join(root, "dist");
  const src = path.join(root, "src");

  cpSync(path.join(src, "index.ts"), path.join(dist, "index.ts"));

  const platform = platforms[platform_id];

  spawnSync({
    cmd: [
      "bun",
      "build",
      "--compile",
      "--outfile",
      platform.output,
      "--target",
      platform.bun_target,
      "index.ts",
    ],
    cwd: dist,
    stdio: ["inherit", "inherit", "inherit"],
  });
}

function removeJunk(root: string) {
  const dist = path.join(root, "dist");

  rmSync(path.join(dist, "index.ts"));
}

async function packageApp(root: string, platform: Platform) {
  const dist = path.join(root, "dist");

  await bundle(dist, platform);
}
