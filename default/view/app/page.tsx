"use client";

import { Ipc } from "newtonium/client";
import type App from "..";

export default function Page() {
  return (
    <>
      <h1>Hello World!</h1>
      <button
        onClick={() =>
          Ipc<App>()
            .greet.get({
              query: {
                name: "World",
              },
            })
            .then((r) => alert(r.data))
        }
      >
        Test
      </button>
    </>
  );
}
