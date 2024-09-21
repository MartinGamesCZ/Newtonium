import { $, spawnSync } from "bun";
import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";

const packages: string[] = ["next", "react", "react-dom"];

const devPackages: string[] = [
  "@types/node",
  "@types/react",
  "@types/react-dom",
  "typescript",
];

export default async function createApp(name: string, cwd: string) {
  // Create project folder
  console.log("Creating project folder");
  const root = createProjectFolder(name, cwd);

  console.log("Copying default files...");
  copyDefault(root);

  console.log("Installing packages...");
  installPackages(root);

  console.log("Creating source directory...");
  const src = createSourceDirectory(root);

  console.log("Copying view directory...");
  copyView(src);

  console.log("Copying source files...");
  copySource(src);

  console.log("Done!");
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
  let default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/root",
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/root",
    );

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
  let default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/view",
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/view",
    );

  cpSync(default_path, path.join(src, "view"), {
    recursive: true,
  });
}

function copySource(src: string) {
  let default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/source",
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/source",
    );

  cpSync(default_path, src, {
    recursive: true,
  });
}
