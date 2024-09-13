import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { readdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

export function run() {
  new Elysia()
    .use(
      staticPlugin({
        assets: import.meta.env.APPDIR + "/view",
        prefix: "/",
      }),
    )
    .listen(3000);
}
