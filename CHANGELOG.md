# Change Log

All notable changes to the "Extension Starter Kit for VSCode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add new constants file to define the documentation URL, repository URL and issues URL
- Add `update` and `toString` methods to `Configuration` class

### Changed

- Update `tsconfig.json` to use `include` and `exclude` properties

### Fixed

- Fix JSON schema for settings validation in `package.json` and `settings.schema.json`
- Fix patterns for folders and files in `filesytem.helper.ts` and `example.controller.ts`
- Fix parameter types in `getFilesInFolder` method in `ExampleController`

## [1.0.0] - 2024-02-05

### Added

- Add `eslint` and `prettier` for code linting and formatting
- Add `husky`, `lint-staged` and `commitlint` for commit linting and formatting
- Add new section to `package.json` for `contributes.configuration` to define extension settings
- Add new section to `package.json` for `contributes.menus` to define extension menus
- Add new section to `package.json` for `contributes.jsonValidation` to define JSON schema for settings
- Add new JSON schema file for settings validation in `schemas/settings.schema.json` and reference it in `package.json`
- Add `CONTRIBUTING.md` file to define how to contribute to the project
- Add `CODE_OF_CONDUCT.md` file to define the code of conduct for the project
- Add command helper to execute commands in the terminal
- Add date helper to format dates
- Add dialog helper to show information, warning and error messages
- Add filesytem helper to read and write files
- Add inflector helper to convert strings to different cases
- Add number helper to format numbers
- Add security helper to escape HTML and JavaScript
- Add text helper to format strings
- Add `@types/minimatch` to `devDependencies` to fix TypeScript error
- Add definition of constants for the extension
- Add class configuration to define the extension settings
- Add JSON schema for settings validation in `package.json` and `settings.schema.json`
- Add an `ExampleController` to handle commands and menus

### Changed

- Update dependencies to latest versions and fix security vulnerabilities
- Update test cases to use lastest version of `glob` and `mocha`
- Update `package.json` to use `eslint` and `prettier` for code linting and formatting
- Improve folder structure and file naming for better organization and readability
- Implement `ExampleController` to handle commands and menus in `extension.ts`

### Fixed

- Fix file creation issue when creating a new file

[unreleased]: https://github.com/ManuelGil/vscode-nextjs-generator/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ManuelGil/vscode-nextjs-generator/releases/tag/v1.0.0
