import { spawn } from "bun";
import path from "path";

export function openWindow(title: string, url: string) {
  const executable = path.join(
    __dirname,
    "../../../",
    "include",
    "webview_linux/webview",
  );

  spawn({
    cmd: [executable, "--title", title, "--url", url],
    stdio: ["inherit", "inherit", "inherit"],
  });
}
