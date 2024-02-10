// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Config, Controllers, and Providers
import { Config, EXTENSION_ID } from './app/config';
import { ExampleController, FeedbackController } from './app/controllers';
import { ChatProvider, FeedbackProvider } from './app/providers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.Uri | null = null;

  // Get the resource for the workspace
  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new Config(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource ?? null),
  );

  // -----------------------------------------------------------------
  // Register ExampleController and commands
  // -----------------------------------------------------------------

  // Create a new ExampleController
  const exampleController = new ExampleController(config);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    `${EXTENSION_ID}.helloWorld`,
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
    `${EXTENSION_ID}.getFilesInFolder`,
    async (args) => await exampleController.getFilesInFolder(args),
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(getFilesInFolder);

  // -----------------------------------------------------------------
  // Register FeedbackProvider and Feedback commands
  // -----------------------------------------------------------------

  // Create a new FeedbackProvider
  const feedbackProvider = new FeedbackProvider(new FeedbackController());

  // Register the feedback provider
  const feedbackTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.feedbackView`,
    {
      treeDataProvider: feedbackProvider,
    },
  );

  // Register the commands
  const aboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const documentation = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.documentation`,
    () => feedbackProvider.controller.documentation(),
  );
  const reportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const rateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const followUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.followUs`,
    () => feedbackProvider.controller.followUs(),
  );
  const supportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(feedbackTreeView);
  context.subscriptions.push(aboutUs);
  context.subscriptions.push(documentation);
  context.subscriptions.push(reportIssues);
  context.subscriptions.push(rateUs);
  context.subscriptions.push(followUs);
  context.subscriptions.push(supportUs);

  // -----------------------------------------------------------------
  // Register the ChatProvider
  // -----------------------------------------------------------------

  // Create a new ChatProvider
  const chatProvider = new ChatProvider(context.extensionUri);

  // Register the ChatProvider
  const chatWebviewProvider = vscode.window.registerWebviewViewProvider(
    ChatProvider.viewType,
    chatProvider,
  );

  context.subscriptions.push(chatWebviewProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {}
