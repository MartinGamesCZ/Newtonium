import commandBuild from "./commands/build";
import commandInit from "./commands/init";
import log, { LogMessage } from "./utils/logger";

const commands = {
  init: commandInit,
  build: commandBuild,
};

const command = process.argv[2];

log(LogMessage.AppName);

if (!commands[command as keyof typeof commands]) {
  console.error("Command not found");

  process.exit();
}

commands[command as keyof typeof commands](process.argv[3]);
