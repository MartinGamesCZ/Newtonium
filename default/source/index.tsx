import {
  Button,
  GravityRenderer,
  Layout,
  startIpcServer,
  Text,
  Window,
} from "@newtonium/gravity";
import { writeFileSync } from "fs";
import path from "path";
import { useState } from "react";
import { AppWindow, App } from "newtonium";
import React from "react";

function MyApp() {
  const [count, setCount] = useState(0);

  return (
    <Layout type="column">
      <Text style={{}}>{count.toString()}</Text>
      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
    </Layout>
  );
}

const window = new AppWindow({
  title: "My App",
  width: 500,
  height: 300,
  content: <MyApp />,
});

const app = new App({
  window,
  icon: path.join(import.meta.dirname, "../assets/icon.png"),
  appName: "my-app",
});

app.start();
