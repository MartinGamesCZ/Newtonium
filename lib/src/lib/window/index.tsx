import { Window } from "@newtonium/gravity";

export class AppWindow {
  title: string;
  width: number;
  height: number;
  content: any;

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

  __proto = {
    transform: () => {
      return (
        <Window title={this.title} width={this.width} height={this.height}>
          {this.content}
        </Window>
      );
    },
  };
}
