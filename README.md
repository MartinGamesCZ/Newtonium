![Banner](banner.png)

# Newtonium

> [!NOTE]
> **NOW WITH GRAVITY RENDERER** (allows you to use React components and replaces web wrapper for native components)

> [!IMPORTANT]
> This project is in a very early development stage. Everything can change and nothing is guaranteed to work.

TypeScript and Rust based framework for building desktop applications using TypeScript and React. Newtonium is built on Qt, Rust and Bun (with React using our own renderer - Gravity), so it should be faster and lighter than Electron.

## Before you start
Note, that newtonium currently only supports development and building for Linux. Windows and MacOS support is planned.

You will also need to get the following dependencies:
- bun
- npm
- Qt development libraries

## Getting started
To get started with Newtonium, you first need to install our main library, which includes the CLI.

```bash
npm install -g newtonium
```

This will take a while, because it needs to download the binaries, but you can add `--foreground-scripts` flag to track the progress.

### Creating a new project
To create a new project, you can use the following command:

```bash
newtonium init my-app
```

This will create a folder with the new project, install all dependencies and setup everything needed.

### Running the project

You can run the development server using the following command (start in the project folder):

```bash
bun run start
```

## Building the project
You can build the project using the following command:

```bash
newtonium build
```

This will create a binary, which you can run and distribute.

## Project structure
There are two main folders in the project:
- `src` - Contains the source code of the project 

MORE INFO ON GITHUB: [MartinGamesCZ/Newtonium](https://github.com/MartinGamesCZ/Newtonium)

## Roadmap
- [x] Working prototype
- [x] Custom webkit embedding
- [ ] Windows support
- [ ] MacOS support
- [ ] Mobile (android) support
- <s>[x] Custom IPC</s> *Removed due to implementation of Gravity renderer*
- [x] Gravity renderer implementation
- [ ] Support for building background services

## Let me know
If you featured Newtonium in your project, please let me know, I would love to see it.

If you have featured Newtonium in some article, or video, please let me know, I would love to see it.

## Contact me
You can find my contact information on my [GitHub profile](https://github.com/MartinGamesCZ).

## Authors
- [Martin Petr](https://github.com/MartinGamesCZ)

## Support me
If you want to support me, you can give this project a star on GitHub. You can also donate me (if you want to, please contact me).

## License

This project is licensed under the LGPL-2.1 License. See the [LICENSE](LICENSE) file for details.

I want this to be a free and open-source project, so everyone can use it. If you want to use it in a commercial project, you can (It would be kind to at least donate).

TL;DR - Use it as you want, but don't sell and/or distribute it as your own and don't blame me for anything.
