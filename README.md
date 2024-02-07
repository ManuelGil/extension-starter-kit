# VS Code Extension - Starter Kit

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.extension-starter-kit?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.extension-starter-kit)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.extension-starter-kit?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.extension-starter-kit)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.extension-starter-kit?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.extension-starter-kit)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.extension-starter-kit?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.extension-starter-kit&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/extension-starter-kit?style=for-the-badge&logo=github)](https://github.com/ManuelGil/extension-starter-kit)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/extension-starter-kit?style=for-the-badge&logo=github)](https://github.com/ManuelGil/extension-starter-kit/blob/main/LICENSE)

This is a starter kit for creating a new extension for Visual Studio Code. It includes a basic structure and configuration to start developing a new extension.

## Table of Contents

- [VS Code Extension - Starter Kit](#vs-code-extension---starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
  - [Running the documentation](#running-the-documentation)
  - [Building the extension](#building-the-extension)
  - [Publishing the extension](#publishing-the-extension)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Features

- Basic configuration for the development environment
  - `.editorconfig` - Editor configuration
  - `.eslintignore` - ESLint ignore file
  - `.eslintrc.json` - ESLint configuration file
  - `.linstagedrc` - Lint-staged configuration file
  - `.nvmrc` - Node version manager configuration file
  - `.prettierrc` - Prettier configuration file
  - `commitlint.config.js` - Commit lint configuration file
  - `package.json` - Package configuration for the extension
  - `tsconfig.json` - TypeScript configuration for the extension
- Basic structure for a new extension
  - `app` - Source code for the extension
    - `config` - Configuration files for the extension
    - `controllers` - Controllers for the extension
    - `helpers` - Helper functions for the extension
    - `models` - Models for the extension
    - `providers` - Providers for the extension
    - `services` - Services for the extension
  - `test` - Test files for the extension
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
  - `extension.ts` - Main file for the extension
  - `commands` - Commands for the extension
    - `example.controller.ts` - Example controller for the extension
  - `providers` - Providers for the extension
    - `feedback.provider.ts` - Feedback provider for the extension

## Prerequisites

You need to have [node](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) installed on your system to run the examples. It is recommended to use the node version used for VS Code development itself which is documented [here](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#prerequisites)

## Usage

- Clone or Download this repository
- Unzip the archive if needed
- Rename the folder if needed
- Add the project folder to the editor
- `npm install` in the terminal, then `F5` to run the sample

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

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details on our code of conduct.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/extension-starter-kit/contributors) who participated in this project.

## License

Extension Starter Kit for VSCode is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
