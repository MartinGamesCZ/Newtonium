import { Button, View, Text, createStyleSheet } from "@newtonium/gravity";
import path from "path";
import { useState } from "react";
import { AppWindow, App } from "newtonium";
import React from "react";

const styles = createStyleSheet({
  root_view: {
    flexDirection: "column",
  },
});

function MyApp() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.root_view}>
      <Text>Count: {count}</Text>
      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
    </View>
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
  icon: path.join(import.meta.dirname, "../assets/icon_128.png"),
});

app.start();
