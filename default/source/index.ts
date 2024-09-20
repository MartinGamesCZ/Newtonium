import { openWindow, runRenderer, Ipc, t } from "newtonium";

const renderer = await runRenderer();

const window = openWindow("Hello", renderer.url);

window.ipc.onMessage((msg: string) => {
  window.ipc.send(`Hello ${msg}!`);
});
