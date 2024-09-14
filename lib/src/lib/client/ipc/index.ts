import { treaty } from "@elysiajs/eden";
import type Elysia from "elysia";

export function Ipc<TrpcType extends Elysia<any, any, any, any, any, any>>() {
  const trpc = treaty<TrpcType>(`localhost:9999`);

  return (trpc as any).__newtonium ? trpc : ({} as any);
}
