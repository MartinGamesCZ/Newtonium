import { openWindow, runRenderer, Ipc, t } from "newtonium";

if (
  process.env.NODE_ENV == "development" &&
  process.env.NEWTONIUM_DEV == "true"
)
  await runRenderer();
else {
  const i = await import("./runner.ts");

  i.run();
}
const window = openWindow("Hello", "http://localhost:3000");

window.ipc.onMessage((msg: string) => {
  window.ipc.send(`Hello ${msg}!`);
});
