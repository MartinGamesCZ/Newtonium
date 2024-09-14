import cors from "@elysiajs/cors";
import Elysia from "elysia";

export function Ipc() {
  return new Elysia().use(cors()).get("/__newtonium", () => {}, {});
}

export { t } from "elysia";
