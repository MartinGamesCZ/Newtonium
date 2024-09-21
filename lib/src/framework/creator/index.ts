import { $, spawn, spawnSync } from "bun";
import chalk from "chalk";
import { cpSync, existsSync, mkdirSync } from "fs";
import ora from "ora";
import path from "path";
import yoctoSpinner from "yocto-spinner";
import createSpinner from "../../utils/spinner";

const packages: string[] = [
  "next",
  "react",
  "react-dom",
  "elysia",
  "@elysiajs/static",
  "newtonium",
  "@newtonium/core",
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

  await installPackages(root);

  const src = createSourceDirectory(root);

  copyView(src);

  copySource(src);

  console.log("Done!");

  setTimeout(() => process.exit(), 1000);
}

function createProjectFolder(name: string, cwd: string) {
  // Create project folder

  const spinner = createSpinner("Creating project directory...");

  const root_path = path.join(cwd, name);

  try {
    mkdirSync(root_path, {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to create project directory");

    throw e;
  }

  spinner.success("Project directory created");

  return root_path;
}

function copyDefault(cwd: string) {
  const spinner = createSpinner("Copying default project files...");

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

  try {
    cpSync(default_path, cwd, {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to copy default project files");

    throw e;
  }

  spinner.success("Default project files copied");
}

async function installPackages(root: string) {
  const spinner = createSpinner("Installing packages...");

  await new Promise((r) =>
    spawn({
      cmd: ["bun", "add", ...packages],
      cwd: root,
      stdio: ["inherit", "inherit", "inherit"],
      onExit: (_: any, code: number) => {
        if (code !== 0) {
          spinner.fail("Failed to install packages");

          throw new Error("Failed to install packages");

          process.exit(0);
        } else {
          r("");
        }
      },
    }),
  );

  await new Promise((r) =>
    spawn({
      cmd: ["bun", "add", "-D", ...devPackages],
      cwd: root,
      stdio: ["inherit", "inherit", "inherit"],
      onExit: (_: any, code: number) => {
        if (code !== 0) {
          spinner.fail("Failed to install packages");

          throw new Error("Failed to install packages");

          process.exit(0);
        } else {
          r("");
        }
      },
    }),
  );

  spinner.success("Packages installed");
}

function createSourceDirectory(root: string) {
  const spinner = createSpinner("Creating source directory...");

  const src = path.join(root, "src");

  try {
    mkdirSync(src, {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to create source directory");

    throw e;
  }

  spinner.success("Source directory created");

  return src;
}

function copyView(src: string) {
  const spinner = createSpinner("Copying view directory...");

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

  try {
    cpSync(default_path, path.join(src, "view"), {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to copy view directory");

    throw e;
  }

  spinner.success("View directory copied");
}

function copySource(src: string) {
  const spinner = createSpinner("Copying source files...");

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

  try {
    cpSync(default_path, src, {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to copy source files");

    throw e;
  }

  spinner.success("Source files copied");
}
