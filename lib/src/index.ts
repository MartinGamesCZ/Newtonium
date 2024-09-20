import commandBuild from "./commands/build";
import commandInit from "./commands/init";

const commands = {
  init: commandInit,
  build: commandBuild,
};

const command = process.argv[2];

if (!commands[command as keyof typeof commands]) {
  console.error("Command not found");

  process.exit();
}

commands[command as keyof typeof commands](process.argv[3]);
