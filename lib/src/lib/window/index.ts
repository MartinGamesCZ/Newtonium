import { spawn } from "bun";
import path from "path";

export function openWindow(title: string, url: string) {
  console.log(import.meta.url)

  const executable =
    process.env.NEWTONIUM_DEV == "true"
      ? path.join(__dirname, "../../../", "include", "webview_linux/webview")
      : path.join(import.meta.env.APPDIR, "include", "webview_linux/webview");

  spawn({
    cmd: [executable, "--title", title, "--url", url],
    stdio: ["inherit", "inherit", "inherit"],
  });
}
