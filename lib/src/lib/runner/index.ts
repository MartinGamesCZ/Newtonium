import { spawn } from "bun";
import path from "path";

export async function runRenderer() {
  const dir = process.cwd();

  spawn({
    cmd: ["bun", "run", "start:renderer"],
    cwd: dir,
    stdio: ["inherit", "inherit", "inherit"],
  });

  await awaitConnection();
}

async function awaitConnection() {
  let running = false;

  while (!running) {
    const r = await fetch("http://localhost:3000/__newtonium/ping", {
      method: "GET",
    }).catch((e) => false);

    if (r) {
      running = true;
      break;
    } else await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
