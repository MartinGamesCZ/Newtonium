import { $, spawnSync } from "bun";
import { cpSync, rmSync } from "fs";
import path from "path";

export async function buildApp(root: string) {
  const src = path.join(root, "src");

  await buildRenderer(root);

  copyRunner(root);

  await compile(root);

  removeJunk(root);

  await packageApp(root);
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
  rmSync(path.join(dist, "runner.ts"));
}

async function packageApp(root: string) {
  const dist = path.join(root, "dist");

  spawnSync({
    cmd: [
      path.join(
        __dirname,
        "../../../include/packager_linux/appimage_tool.AppImage",
      ),
      ".",
      "../dist.AppImage",
    ],
    cwd: dist,
    stdio: ["inherit", "inherit", "inherit"],
  });
}
