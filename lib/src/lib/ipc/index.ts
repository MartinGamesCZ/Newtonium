import type Window from "@newtonium/core";

export default function Ipc(window: Window) {
  return {
    send: (msg: string) => {
      window.ipc.send(msg);
    },
    onMessage: (cb: (msg: string) => any) => {
      window.ipc.onMessage(cb);
    },
  };
}
