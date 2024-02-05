// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Config and ExampleController classes
import { Config, EXTENSION_ID } from './app/config';
import { ExampleController } from './app/controllers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.Uri | null = null;

  // Get the resource for the workspace
  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  // Get the configuration for the extension
  const config = new Config(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource ?? null),
  );

  const exampleController = new ExampleController(config);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'extension-starter-kit.helloWorld',
    () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      exampleController.helloWorld();
    },
  );

  // Register the command to get the files in a folder
  // The commandId parameter must match the command field in package.json
  // The args parameter is the path to the folder
  const getFilesInFolder = vscode.commands.registerCommand(
    'extension-starter-kit.getFilesInFolder',
    async (args) => await exampleController.getFilesInFolder(args.path),
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(getFilesInFolder);
}

// this method is called when your extension is deactivated
export function deactivate() {}
