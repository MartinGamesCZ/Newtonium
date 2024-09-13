import { openWindow, runRenderer } from "newtonium";

if (
  process.env.NODE_ENV == "development" &&
  process.env.NEWTONIUM_DEV == "true"
)
  await runRenderer();
else {
  const i = await import("./runner.ts");

  i.run();
}
openWindow("Hello", "http://localhost:3000");
