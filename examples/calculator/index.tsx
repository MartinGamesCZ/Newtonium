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
import { useEffect, useState } from "react";
import { AppWindow, App } from "newtonium";
import React from "react";

function MyApp() {
  const [expression, setExpression] = useState("");

  useEffect(() => {
    if (expression.startsWith("0") && expression.length > 1)
      setExpression(expression.slice(1));

    if (expression.endsWith("=")) {
      const result = eval(expression.slice(0, -1));

      setExpression(result.toString());
    }
  }, [expression]);

  return (
    <Layout type="column">
      <Text style={{}}>{expression.length > 0 ? expression : "0"}</Text>
      <Layout type="row">
        <Button onClick={() => setExpression((e) => e + "1")}>1</Button>
        <Button onClick={() => setExpression((e) => e + "2")}>2</Button>
        <Button onClick={() => setExpression((e) => e + "3")}>3</Button>
        <Button onClick={() => setExpression((e) => e + "+")}>+</Button>
      </Layout>
      <Layout type="row">
        <Button onClick={() => setExpression((e) => e + "4")}>4</Button>
        <Button onClick={() => setExpression((e) => e + "5")}>5</Button>
        <Button onClick={() => setExpression((e) => e + "6")}>6</Button>
        <Button onClick={() => setExpression((e) => e + "-")}>-</Button>
      </Layout>
      <Layout type="row">
        <Button onClick={() => setExpression((e) => e + "7")}>7</Button>
        <Button onClick={() => setExpression((e) => e + "8")}>8</Button>
        <Button onClick={() => setExpression((e) => e + "9")}>9</Button>
        <Button onClick={() => setExpression((e) => e + "*")}>*</Button>
      </Layout>
      <Layout type="row">
        <Button onClick={() => setExpression((e) => e + "0")}>0</Button>
        <Button onClick={() => setExpression((e) => e.slice(1))}>&lt;-</Button>
        <Button onClick={() => setExpression("")}>CLR</Button>
        <Button onClick={() => setExpression((e) => e + "=")}>=</Button>
      </Layout>
    </Layout>
  );
}

const window = new AppWindow({
  title: "Ultra mega kalkulátor",
  width: 500,
  height: 300,
  content: <MyApp />,
});

const app = new App({
  window,
  icon: path.join(import.meta.dirname, "../assets/icon.png"),
  appName: "ultra-mega-calculator",
});

app.start();
