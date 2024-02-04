# Change Log

All notable changes to the "Extension Starter Kit for VSCode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add `eslint` and `prettier` for code linting and formatting
- Add `husky`, `lint-staged` and `commitlint` for commit linting and formatting
- Add new section to `package.json` for `contributes.configuration` to define extension settings
- Add new section to `package.json` for `contributes.menus` to define extension menus
- Add new section to `package.json` for `contributes.jsonValidation` to define JSON schema for settings
- Add new JSON schema file for settings validation in `schemas/settings.schema.json` and reference it in `package.json`
- Add `CONTRIBUTING.md` file to define how to contribute to the project
- Add `CODE_OF_CONDUCT.md` file to define the code of conduct for the project

### Changed

- Update dependencies to latest versions and fix security vulnerabilities
- Update test cases to use lastest version of `glob` and `mocha`
- Update `package.json` to use `eslint` and `prettier` for code linting and formatting
- Improve folder structure and file naming for better organization and readability
