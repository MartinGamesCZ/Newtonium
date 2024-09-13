import { buildApp } from "../framework/builder";

export default function commandBuild() {
  buildApp(process.cwd());
}
