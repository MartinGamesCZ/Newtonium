import { $, spawnSync } from "bun";
import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";

const packages: string[] = [
  "next",
  "react",
  "react-dom",
  "elysia",
  "@elysiajs/static",
];

const devPackages: string[] = [
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "typescript",
];

export default async function createApp(name: string, cwd: string) {
  // Create project folder
  const root = createProjectFolder(name, cwd);

  copyDefault(root);
  installPackages(root);

  const src = createSourceDirectory(root);

  copyView(src);
  copySource(src);
}

function createProjectFolder(name: string, cwd: string) {
  // Create project folder

  const root_path = path.join(cwd, name);

  mkdirSync(root_path, {
    recursive: true,
  });

  return root_path;
}

function copyDefault(cwd: string) {
  let default_path = path.join(__dirname, "../../../../", "default/root");

  if (!existsSync(default_path))
    default_path = path.join(__dirname, "../../..", "include/default/root");

  cpSync(default_path, cwd, {
    recursive: true,
  });
}

async function installPackages(root: string) {
  spawnSync({
    cmd: ["bun", "add", ...packages],
    cwd: root,
    stdio: ["inherit", "inherit", "inherit"],
  });

  spawnSync({
    cmd: ["bun", "add", "-D", ...devPackages],
    cwd: root,
    stdio: ["inherit", "inherit", "inherit"],
  });
}

function createSourceDirectory(root: string) {
  const src = path.join(root, "src");

  mkdirSync(src, {
    recursive: true,
  });

  return src;
}

function copyView(src: string) {
  const default_path = path.join(__dirname, "../../../..", "default/view");

  cpSync(default_path, path.join(src, "view"), {
    recursive: true,
  });
}

function copySource(src: string) {
  const default_path = path.join(__dirname, "../../../..", "default/source");

  cpSync(default_path, src, {
    recursive: true,
  });
}
