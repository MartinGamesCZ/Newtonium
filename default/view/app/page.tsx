"use client";

import { test } from "newtonium/client";

export default function Page() {
  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={test}>Test</button>
    </>
  );
}
