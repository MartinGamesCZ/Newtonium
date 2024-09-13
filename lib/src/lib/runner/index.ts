import { spawn } from "bun";
import path from "path";

export async function runRenderer() {
  const dir = process.cwd();

  spawn({
    cmd: ["bun", "run", "start:renderer"],
    cwd: dir,
    stdio: ["inherit", "inherit", "inherit"],
  });
}
