import { $, spawn, spawnSync } from "bun";
import { cpSync, existsSync, rmSync } from "fs";
import path from "path";
import bundle from "@newtonium/bundler";
import log, { color } from "../../utils/logger";
import createSpinner from "../../utils/spinner";
import { readableStreamToText } from "bun";
import shortenLog from "../../utils/log_shortener";

export enum Platform {
  "windows" = "windows",
  "linux" = "linux",
}

const platforms = {
  [Platform.linux]: {
    bun_target: "bun-linux-x64",
    output: "AppRun",
    bundle: "app",
  },
  [Platform.windows]: {
    bun_target: "bun-windows-x64",
    output: "AppRun.exe",
    bundle: "app.exe",
  },
};

export async function buildApp(root: string, platform: Platform) {
  const src = path.join(root, "src");
  const config_path = path.join(root, "newtonium.config.mjs");

  let config: any = {};

  if (existsSync(config_path)) config = (await import(config_path)).default;

  const dirname = path.basename(path.dirname(src));

  log("");
  log(color(["white", "green", "white"])`Building ${dirname}...`);
  log("");

  copyRunner(root);

  await compile(root, platform);

  removeJunk(root);

  await packageApp(root, platform, config);

  log("");
  log("Project was built successfully!");
  log(
    color(["white", "green", "white"])`You can now run and/or distribute ${
      "dist/bundle/" + platforms[platform].bundle
    }`
  );
}

function copyRunner(root: string) {
  const spinner = createSpinner("Copying runner files...");

  const dist = path.join(root, "dist");
  const default_path = path.join(
    process.env.NEWTONIUM_CLI_DIR ?? path.join(import.meta.dirname, "../"),
    "../../",
    "include/default/runner"
  );

  try {
    cpSync(default_path, dist, {
      recursive: true,
    });
  } catch (e) {
    spinner.fail("Failed to copy runner files");

    throw e;
  }

  spinner.success("Runner files copied");
}

async function compile(root: string, platform_id: Platform) {
  const spinner = createSpinner("Building code...");

  const dist = path.join(root, "dist");
  const src = path.join(root, "src");

  try {
    //cpSync(path.join(src, "index.ts"), path.join(dist, "index.ts"));
  } catch (e) {
    spinner.fail("Failed to copy entrypoint");

    throw e;
  }

  const platform = platforms[platform_id];

  await new Promise((r) =>
    spawn({
      cmd: [
        "bun",
        "build",
        "--minify",
        "--target",
        "bun",
        "--external",
        "@newtonium/core",
        "--outdir",
        ".",
        "../src/index.tsx",
      ],
      cwd: dist,
      stdio: ["pipe", "pipe", "pipe"],
      onExit: async (proc, code) => {
        if (code !== 0) {
          spinner.fail("Failed to build code");

          const err = await readableStreamToText(
            proc.stderr as ReadableStream<any>
          );

          const stdout = await readableStreamToText(
            proc.stdout as ReadableStream<any>
          );

          const out = "\n" + err + "\n" + stdout;

          console.log(shortenLog(code ?? -1, out));

          throw new Error("Failed to build code");
          process.exit(0);
        } else r("");
      },
    })
  );

  spinner.success("Code built");
}

function removeJunk(root: string) {
  const spinner = createSpinner("Removing junk files...");

  const dist = path.join(root, "dist");

  try {
    //rmSync(path.join(dist, "index.ts"));
  } catch (e) {
    spinner.fail("Failed to remove junk files");

    throw e;
  }

  spinner.success("Junk files removed");
}

async function packageApp(root: string, platform: Platform, config: any) {
  const spinner = createSpinner("Packaging app...");

  const dist = path.join(root, "dist");

  if (config.build && config.build.include) {
    for (const file of config.build.include) {
      const f_path = path.join(root, file);

      cpSync(f_path, path.join(dist, file), {
        recursive: true,
      });
    }
  }

  try {
    await bundle(dist, "__entrypoint.js", false, platform, true);
  } catch (e) {
    spinner.fail("Failed to package app");

    throw e;
  }

  spinner.success("App packaged");
}
