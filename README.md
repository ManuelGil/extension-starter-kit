# VS Code Extension - Starter Kit

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/extensionPublisher.vscode-extension-starter-advanced?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=extensionPublisher.vscode-extension-starter-advanced)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/extensionPublisher.vscode-extension-starter-advanced?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=extensionPublisher.vscode-extension-starter-advanced)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/extensionPublisher.vscode-extension-starter-advanced?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=extensionPublisher.vscode-extension-starter-advanced)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/extensionPublisher.vscode-extension-starter-advanced?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=extensionPublisher.vscode-extension-starter-advanced&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/githubUsername/vscode-extension-starter-advanced?style=for-the-badge&logo=github)](https://github.com/githubUsername/vscode-extension-starter-advanced)
[![GitHub license](https://img.shields.io/github/license/githubUsername/vscode-extension-starter-advanced?style=for-the-badge&logo=github)](https://github.com/githubUsername/vscode-extension-starter-advanced/blob/main/LICENSE)

This is a starter kit for creating a new extension for Visual Studio Code. It includes a basic structure and configuration to start developing a new extension.

## Table of Contents

- [VS Code Extension - Starter Kit](#vs-code-extension---starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Customization](#customization)
  - [Running the documentation](#running-the-documentation)
  - [Building the extension](#building-the-extension)
  - [Publishing the extension](#publishing-the-extension)
  - [Follow Me](#follow-me)
  - [VSXpert Template](#vsxpert-template)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Features

- Basic configuration for the development environment
  - `.editorconfig` - Editor configuration
  - `.linstagedrc` - Lint-staged configuration file
  - `.nvmrc` - Node version manager configuration file
  - `biome.json` - Biome configuration file
  - `commitlint.config.js` - Commit lint configuration file
  - `package.json` - Package configuration to manage dependencies
  - `tsconfig.json` - TypeScript configuration to compile the source code
- Basic structure for a new extension
  - `app` - Source code to develop the extension
    - `configs` - Configuration files and constants
    - `controllers` - Controllers to listen to commands
    - `helpers` - Helper functions with common tasks
    - `models` - Models to represent data
    - `providers` - Providers to provide data
    - `services` - Services to provide functionality
  - `test` - Test files to test the extension
- JSON Schema validations for workspace settings
  - `settings.schema.json` - JSON schema for the workspace settings
- Helper functions to get started with the extension
  - `command.helper.ts` - Helper functions to create a new command
  - `data.helper.ts` - Helper functions to create a new data provider
  - `dialog.helper.ts` - Helper functions to create a new dialog
  - `filesystem.helper.ts` - Helper functions to create a new file system provider
  - `inflection.helper.ts` - Helper functions to create a new inflection provider
  - `number.helper.ts` - Helper functions to create a new number provider
  - `security.helper.ts` - Helper functions to create a new security provider
  - `text.helper.ts` - Helper functions to create a new text provider
- Basic commands to get started with the extension
  - `extension.ts` - Main file to run the extension
  - `example.controller.ts` - Example controller with basic commands
- Basic views to get started with the extension
  - `providers` - Providers for the extension views
    - `feedback.provider.ts` - Provides feedback to the user
    - `listFiles.provider.ts` - Provides a list of files from the workspace
    - `color.provider.ts` - Provides a color picker to the user
- Basic `OpenAI` integration to get started with the extension
  - `openai` - OpenAI integration and chat provider
    - `openai.service.ts` - OpenAI service to interact with the API
    - `chat.provider.ts` - Provides chat functionality to the user

## Prerequisites

You need to have [node](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) installed on your system to run the examples. It is recommended to use the node version used for VS Code development itself which is documented [here](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#prerequisites)

## Getting Started

To get started with the extension, follow these steps:

1. Clone the repository

    ```bash
    git clone
    cd vscode-extension-starter-advanced
    npm install
    code .
    ```

2. Press `F5` to open a new instance of Visual Studio Code with the extension running in debug mode
3. Open the command palette and run the `My Extension: Hello World` command
4. The extension will display a message in the output window

For more information, see the [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Customization

To customize the extension, follow these steps:

1. Update multiple instances of the following items in bulk:

    - `extensionIdentifier` - Replace with your extension identifier, e.g. `fileManager`
    - `vscode-extension-starter-advanced` - Replace with your extension name, e.g. `vscode-file-manager`
    - `My Extension` - Replace with your extension display name, e.g. `VS Code File Manager`
    - `githubUsername` - Replace with your GitHub githubUsername, e.g. `ManuelGil`
    - `extensionPublisher` - Replace with your extension publisher, e.g. `imgildev`

2. Change the `LICENSE` file with your extension information
3. Remove the unnecessary files and folders
4. Add the necessary files and folders
5. Update the `src/app/configs/constants.config.ts` and `src/app/configs/extension.config.ts` file with your extension information
6. Update the `src/app/controllers/feedback.controller.ts` file with your extension information
7. Update the `src/extension.ts` file with your extension information
8. Update the `settings.schema.json` file with your extension information
9. Update the `package.json` file with your extension information
10. Update the `README.md` file with your extension information

For more information, see the [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Running the documentation

To run the documentation, execute the following command in the terminal:

```bash
npm run compodoc
```

This will generate the documentation in the `compodoc` folder.

For more information, see the [official documentation](https://compodoc.app/guides/getting-started.html)

## Building the extension

To build the extension, execute the following command in the terminal:

```bash
vsce package
```

This will create a `.vsix` file in the root of the project.

For more information, see the [official documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Publishing the extension

To publish the extension, execute the following command in the terminal:

```bash
vsce publish
```

This will open a new instance of Visual Studio Code with the extension running in debug mode.

For more information, see the [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Follow Me

If you enjoy using Auto Barrel, consider following me for updates on this and future projects:

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## VSXpert Template

This extension was created using [VSXpert](https://vsxpert.com), a template that helps you create Visual Studio Code extensions with ease. VSXpert provides a simple and easy-to-use structure to get you started quickly.

## Contributing

This extension is open-source software, and we welcome contributions from the community. If you'd like to contribute, please fork the [GitHub repository](https://github.com/ManuelGil/vscode-extension-starter-advanced) and submit a pull request with your changes.

Before contributing, please read our [Contribution Guidelines](./CONTRIBUTING.md) for instructions on coding standards, testing, and more.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-extension-starter-advanced/contributors) who participated in this project.

## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for details.
