import chalk from "chalk";
import ora from "ora";

export default function createSpinner(text: string) {
  const spinner = ora({
    text: text,
  }).start();

  return {
    success: (msg: string) =>
      spinner.stopAndPersist({
        symbol: chalk.bold(chalk.green("✓")),
        text: msg,
      }),
    fail: (msg: string) =>
      spinner.stopAndPersist({
        symbol: chalk.bold(chalk.red("✗")),
        text: msg,
      }),
  };
}
