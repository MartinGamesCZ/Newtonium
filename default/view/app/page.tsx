"use client";

import { Ipc } from "newtonium/client";

export default function Page() {
  return (
    <>
      <h1>Hello World!</h1>
      <button
        onClick={() =>
          Ipc<any>()
            .greet.get({
              query: {
                name: "World",
              },
            })
            .then((r: any) => alert(r.data))
        }
      >
        Test
      </button>
    </>
  );
}
