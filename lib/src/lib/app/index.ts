import { writeFileSync } from "fs";
import { AppWindow } from "../window/index";
import { createRoot, GravityRenderer } from "@newtonium/gravity";
import { Window } from "@newtonium/core";
import { randomUUID } from "crypto";

// TODO: Add multi-window support
export class App {
  window: AppWindow;
  container;
  icon: string;

  constructor({ window, icon }: { window: AppWindow; icon: string }) {
    this.window = window;
    this.icon = icon;

    this.window.__createProto(this.icon);

    if (this.window.__proto == null) throw new Error("Failed to create window");

    this.container = createRoot(window.__proto as Window);
  }

  async render() {
    if (this.window.__proto)
      await GravityRenderer.render(
        this.window.content,
        this.container,
        this.window.__proto
      );
  }

  async start() {
    if (this.window.__proto == null) throw new Error("Failed to create window");

    this.window.__proto.on("ready", () => {
      this.render();
    });

    this.window.__proto.run();
  }
}
