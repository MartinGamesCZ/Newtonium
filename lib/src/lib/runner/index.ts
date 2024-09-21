import { spawn } from "bun";
import path from "path";
import { getPort } from "../helpers/port";
import { checkIsDev } from "../helpers/env";
import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";

export async function runRenderer() {
  const dir = process.cwd();

  const port = getPort();

  if (!checkIsDev()) {
    new Elysia()
      .use(
        staticPlugin({
          assets: process.cwd() + "/view",
          prefix: "/",
        }),
      )
      .listen(port);

    return {
      url: `http://localhost:${port}`,
    };
  }

  spawn({
    cmd: ["bun", "run", "start:renderer", "--port", port.toString()],
    cwd: dir,
    stdio: ["inherit", "inherit", "inherit"],
  });

  await awaitConnection(port);

  return {
    url: `http://localhost:${port}`,
  };
}

async function awaitConnection(port: number) {
  let running = false;

  while (!running) {
    const r = await fetch("http://localhost:" + port + "/__newtonium/ping", {
      method: "GET",
    }).catch((e) => false);

    if (r) {
      running = true;
      break;
    } else await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
