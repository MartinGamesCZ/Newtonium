import { Window } from "@newtonium/core";

export class AppWindow {
  title: string;
  width: number;
  height: number;
  content: any;
  __proto: Window | null = null;

  constructor({
    title,
    width,
    height,
    content,
  }: {
    title?: string;
    width?: number;
    height?: number;
    content: any;
  }) {
    this.title = title ?? "Newtonium App";
    this.width = width ?? 800;
    this.height = height ?? 600;
    this.content = content;
  }

  __createProto(icon: string) {
    this.__proto = new Window(this.title, icon);
  }
}
