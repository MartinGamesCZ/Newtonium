export const Ipc = {
  send: (msg: string) => {
    (window as any).newtonium_ipc.send(msg);
  },
  onMessage: (cb: (msg: string) => any) => {
    (window as any).newtonium_ipc.onMessage(cb);
  },
};
