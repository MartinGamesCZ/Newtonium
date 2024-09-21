import { buildApp, Platform } from "../framework/builder";

export default function commandBuild() {
  const flags = Object.fromEntries(
    process.argv
      .slice(2)
      .filter((a) => a.startsWith("--"))
      .map((a) => a.split("=").map((a) => a.replace("--", ""))),
  );

  let target =
    (flags.target as Platform) ??
    (process.platform == "win32" ? Platform.windows : Platform.linux);

  buildApp(process.cwd(), target);
}
