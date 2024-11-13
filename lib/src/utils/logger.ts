import chalk, { ColorName } from "chalk";
import pkg from "../../package.json";

const LogMessages = {
  AppName: color([
    "white",
    "green",
    "gray",
    "white",
    "white",
  ])`${"Newtonium"} | ${"v" + pkg.version}`,
};

export enum LogMessage {
  AppName = "AppName",
}

export default function log(text: string | LogMessage) {
  if (text in LogMessage) console.log(LogMessages[text]);
  else console.log(text);
}

export function color(clr: ColorName[]) {
  return (chunks: any, ...values: any[]) => {
    let str = "";
    let color = 0;

    for (let i = 0; i < chunks.raw.length; i++) {
      str += chalk[clr[color]](chunks.raw[i]);
      if (values[i]) str += chalk[clr[color + 1]](values[i]);

      color += 2;
    }

    return str;
  };
}
