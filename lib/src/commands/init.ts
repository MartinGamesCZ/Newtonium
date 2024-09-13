import createApp from "../framework/creator";

export default function commandInit(name: string) {
  if (!name) return console.error("Please provide a name for the project");

  createApp(name, process.cwd());
}
