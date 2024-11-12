import { $, readableStreamToText, spawn, spawnSync } from "bun";
import chalk from "chalk";
import { cpSync, existsSync, mkdirSync, rm, rmSync } from "fs";
import ora from "ora";
import path from "path";
import createSpinner from "../../utils/spinner";
import shortenLog from "../../utils/log_shortener";
import log, { color } from "../../utils/logger";

const packages: string[] = [
  "@newtonium/core@0.3.10",
  "@newtonium/gravity@0.1.0",
  "react",
  process.env._NEWTONIUM_FAKED_INSTALL ? null : "newtonium",
].filter((a) => a != null);

const devPackages: string[] = ["@types/node", "@types/react"];

export default async function createApp(name: string, cwd: string) {
  log("");
  log(color(["white", "green", "white"])`Creating project ${name}...`);
  log("");

  // Create project folder
  const root = createProjectFolder(name, cwd);

  copyDefault(root);

  await installPackages(root);

  await fakedNewtoniumIntall(root);

  const src = createSourceDirectory(root);

  //copyView(src);

  copySource(src);

  log("\nProject created successfully!");
  log(
    color([
      "white",
      "green",
      "white",
      "green",
      "white",
    ])`You can now run project using ${`cd ${name}`} and ${`bun run start`}`
  );

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
    "default/root"
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/root"
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

  const promises: Promise<any>[] = [];

  for (const pkg of packages) {
    promises.push(
      new Promise((r) =>
        spawn({
          cmd: ["bun", "install", pkg],
          cwd: root,
          stdio: ["pipe", "pipe", "pipe"],
          onExit: async (proc, code: number) => {
            if (code !== 0) {
              spinner.fail("Failed to install packages");

              const err = await readableStreamToText(
                proc.stderr as ReadableStream<any>
              );
              const stdout = await readableStreamToText(
                proc.stdout as ReadableStream<any>
              );

              const out = "\n" + err + "\n" + stdout;

              console.log(shortenLog(code, out));

              throw new Error("Failed to install packages");
              process.exit(0);
            } else {
              r("");
            }
          },
        })
      )
    );
  }

  await Promise.all(promises);

  /*await new Promise((r) =>
    spawn({
      cmd: ["bun", "install", "-D", ...devPackages],
      cwd: root,
      stdio: ["pipe", "pipe", "pipe"],
      onExit: async (proc, code: number) => {
        if (code !== 0) {
          spinner.fail("Failed to install packages");

          const err = await readableStreamToText(
            proc.stderr as ReadableStream<any>
          );
          const stdout = await readableStreamToText(
            proc.stdout as ReadableStream<any>
          );

          const out = "\n" + err + "\n" + stdout;

          console.log(shortenLog(code, out));

          throw new Error("Failed to install packages");
          process.exit(0);
        } else {
          r("");
        }
      },
    })
  );*/

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

/*function copyView(src: string) {
  const spinner = createSpinner("Copying view directory...");

  let default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/view"
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/view"
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
}*/

function copySource(src: string) {
  const spinner = createSpinner("Copying source files...");

  let default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../",
    "default/source"
  );

  if (!existsSync(default_path))
    default_path = path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "include/default/source"
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

function fakedNewtoniumIntall(root: string) {
  console.log("Faking newtonium install...");

  const folder = path.join(root, "node_modules", "newtonium");

  rmSync(folder, {
    recursive: true,
  });

  mkdirSync(folder, {
    recursive: true,
  });

  cpSync(
    path.join(
      process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../../"),
      "../",
      "dist_lib"
    ),
    folder,
    {
      recursive: true,
    }
  );
}
