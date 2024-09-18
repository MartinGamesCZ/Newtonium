import { spawn } from "bun";
import path from "path";
import Window from "@newtonium/core";

export function openWindow(title: string, url: string) {
  // TODO: Fix when app is built (binary not found)
  const window = new Window(title, url);

  if (process.env.NEWTONIUM_DEV != "true")
    window.setCustomBinaryPath(
      path.join(import.meta.env.APPDIR ?? "", "include/core"),
    );

  window.open();

  window.on("exit", () => {
    process.exit();
  });
}
