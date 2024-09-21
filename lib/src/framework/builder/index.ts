import { $, spawnSync } from "bun";
import { cpSync, rmSync } from "fs";
import path from "path";
import bundle from "@newtonium/bundler";

export async function buildApp(root: string) {
  const src = path.join(root, "src");

  console.log("Building view...");
  await buildRenderer(root);

  console.log("Copying image files...");
  copyRunner(root);

  console.log("Compiling source...");
  await compile(root);

  console.log("Cleaning up...");
  removeJunk(root);

  console.log("Packaging app...");
  await packageApp(root);

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
  const default_path = path.join(__dirname, "../../../..", "default/runner");

  cpSync(default_path, dist, {
    recursive: true,
  });
}

async function compile(root: string) {
  const dist = path.join(root, "dist");
  const src = path.join(root, "src");

  cpSync(path.join(src, "index.ts"), path.join(dist, "index.ts"));

  spawnSync({
    cmd: ["bun", "build", "--compile", "--outfile", "AppRun", "index.ts"],
    cwd: dist,
    stdio: ["inherit", "inherit", "inherit"],
  });
}

function removeJunk(root: string) {
  const dist = path.join(root, "dist");

  rmSync(path.join(dist, "index.ts"));
}

async function packageApp(root: string) {
  const dist = path.join(root, "dist");

  await bundle(dist);
}
