"use client";

import { test } from "newtonium/src/lib/client/index.ts";

export default function Page() {
  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={test}>Test</button>
    </>
  );
}
