import { openWindow, runRenderer, Ipc, t } from "newtonium";

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

const App = Ipc().get(
  "/greet",
  ({ query }) => {
    return `Hello ${query.name}!`;
  },
  {
    query: t.Object({
      name: t.String(),
    }),
  },
);

App.listen(9999);

export type App = typeof App;
