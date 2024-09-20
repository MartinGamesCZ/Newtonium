"use client";

import { Ipc } from "newtonium/client";

export default function Page() {
  return (
    <>
      <h1>Hello World!</h1>
      <button
        onClick={() => {
          Ipc.onMessage((msg) => {
            alert(msg);
          })

          Ipc.send("World");
        }}
      >
        Test
      </button>
    </>
  );
}
