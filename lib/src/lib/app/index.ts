import { writeFileSync } from "fs";
import { AppWindow } from "../window/index";
import { GravityRenderer, startIpcServer } from "@newtonium/gravity";
import Window from "@newtonium/core";
import { randomUUID } from "crypto";

export function createRoot() {
  return {
    type: "gravity-root",
    children: "",
  };
}

// TODO: Add multi-window support
export class App {
  window: AppWindow;
  container: {
    type: string;
    children: string;
  };
  appName: string;
  icon: string;
  sid: string;
  core_process: Window;

  constructor({
    window,
    icon,
    appName,
  }: {
    window: AppWindow;
    icon: string;
    appName: string;
  }) {
    this.window = window;
    this.icon = icon;
    this.appName = appName;

    this.container = createRoot();
    this.sid = randomUUID().replace(/-/g, "");
  }

  private async renderInitial() {
    await GravityRenderer.render(
      this.window.__proto.transform(),
      this.container
    );

    return this.container.children;
  }

  async start() {
    const initial = await this.renderInitial();

    writeFileSync(`/tmp/${this.sid}.qml`, initial);

    await startIpcServer();

    this.core_process = new Window(
      `/tmp/${this.sid}.qml`,
      this.icon,
      this.appName
    );

    await this.core_process.open();

    return this;
  }
}
