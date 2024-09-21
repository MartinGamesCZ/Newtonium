import { spawn } from "bun";
import path from "path";
import Window from "@newtonium/core";
import Ipc from "../ipc";

export function openWindow(title: string, url: string) {
  // TODO: Fix when app is built (binary not found)
  const window = new Window(title, url);

  if (process.env.NEWTONIUM_DEV != "true")
    window.setCustomBinaryPath(
      path.join(
        process.cwd() ?? "",
        "include/core" + (process.platform == "win32" ? ".exe" : ""),
      ),
    );

  window.open();

  window.on("exit", () => {
    process.exit();
  });

  return {
    ipc: Ipc(window),
  };
}
