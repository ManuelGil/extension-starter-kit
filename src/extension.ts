// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Configs, Controllers, and Providers
import {
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  ExtensionConfig,
} from './app/configs';
import {
  ExampleController,
  FeedbackController,
  ListFilesController,
} from './app/controllers';
import {
  ChatProvider,
  ColorProvider,
  FeedbackProvider,
  ListFilesProvider,
} from './app/providers';
import { OpenAIService } from './app/services';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.WorkspaceFolder | undefined;

  // Check if there are workspace folders
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    const message = vscode.l10n.t(
      'No workspace folders are open. Please open a workspace folder to use this extension',
    );
    vscode.window.showErrorMessage(message);
    return;
  }

  // Optionally, prompt the user to select a workspace folder if multiple are available
  if (vscode.workspace.workspaceFolders.length === 1) {
    resource = vscode.workspace.workspaceFolders[0];
  } else {
    const placeHolder = vscode.l10n.t(
      'Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
    );
    const selectedFolder = await vscode.window.showWorkspaceFolderPick({
      placeHolder,
    });

    resource = selectedFolder;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new ExtensionConfig(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri),
  );

  // Watch for changes in the configuration
  vscode.workspace.onDidChangeConfiguration((event) => {
    if (event.affectsConfiguration(EXTENSION_ID, resource?.uri)) {
      config.update(
        vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri),
      );
    }
  });

  // -----------------------------------------------------------------
  // Get version of the extension
  // -----------------------------------------------------------------

  // Get the previous version of the extension
  const previousVersion = context.globalState.get('version');
  // Get the current version of the extension
  const currentVersion = context.extension.packageJSON.version;

  // Check if the extension is running for the first time
  if (!previousVersion) {
    const message = vscode.l10n.t('Welcome to {0}!', [EXTENSION_DISPLAY_NAME]);
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // Check if the extension has been updated
  if (previousVersion && previousVersion !== currentVersion) {
    const message = vscode.l10n.t(
      'Looks like {0} has been updated to version {1}!',
      [EXTENSION_DISPLAY_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // #region Example

  // -----------------------------------------------------------------
  // Register ExampleController and commands
  // -----------------------------------------------------------------

  // Create a new ExampleController
  const exampleController = new ExampleController(config);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposableHelloWorld = vscode.commands.registerCommand(
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
  const disposableGetFilesInFolder = vscode.commands.registerCommand(
    `${EXTENSION_ID}.getFilesInFolder`,
    (args) => exampleController.getFilesInFolder(args),
  );

  const disposableConvertToTS = vscode.commands.registerCommand(
    `${EXTENSION_ID}.convertToTS`,
    () => exampleController.convertToTS(),
  );

  context.subscriptions.push(
    disposableHelloWorld,
    disposableGetFilesInFolder,
    disposableConvertToTS,
  );

  // #endregion Example

  // #region List Files

  // -----------------------------------------------------------------
  // Register ListFilesController
  // -----------------------------------------------------------------

  // Create a new ListFilesController
  const listFilesController = new ListFilesController(config);

  const disposableOpenFile = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.openFile`,
    (uri) => listFilesController.openFile(uri),
  );

  context.subscriptions.push(disposableOpenFile);

  // -----------------------------------------------------------------
  // Register ListFilesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListFilesProvider
  const listFilesProvider = new ListFilesProvider(listFilesController);

  // Register the list provider
  const listFilesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listFilesView`,
    {
      treeDataProvider: listFilesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshList = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.refreshList`,
    () => listFilesProvider.refresh(),
  );

  context.subscriptions.push(listFilesTreeView, disposableRefreshList);

  // -----------------------------------------------------------------
  // Register ListFilesProvider and ListMethodsProvider events
  // -----------------------------------------------------------------

  vscode.workspace.onDidChangeTextDocument(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidCreateFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidDeleteFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidRenameFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidSaveTextDocument(() => {
    listFilesProvider.refresh();
  });

  // #endregion List Files

  // #region Feedback

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
  const disposableAboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const disposableDocumentation = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.documentation`,
    () => feedbackProvider.controller.documentation(),
  );
  const disposableReportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const disposableRateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const disposableFollowUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.followUs`,
    () => feedbackProvider.controller.followUs(),
  );
  const disposableSupportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(
    feedbackTreeView,
    disposableAboutUs,
    disposableDocumentation,
    disposableReportIssues,
    disposableRateUs,
    disposableFollowUs,
    disposableSupportUs,
  );

  // #endregion Feedback

  // #region Chat

  // -----------------------------------------------------------------
  // Register the ChatProvider
  // -----------------------------------------------------------------

  // Create a new ChatProvider
  const chatProvider = new ChatProvider(context.extensionUri);
  chatProvider.setService(new OpenAIService(config));

  // Register the ChatProvider
  const chatWebviewProvider = vscode.window.registerWebviewViewProvider(
    ChatProvider.viewType,
    chatProvider,
  );

  context.subscriptions.push(chatWebviewProvider);

  // #endregion Chat

  // #region Color

  // -----------------------------------------------------------------
  // Register the ColorProvider
  // -----------------------------------------------------------------

  // Create a new ColorProvider
  const colorProvider = new ColorProvider(context.extensionUri);

  // Register the ColorProvider
  const colorWebviewProvider = vscode.window.registerWebviewViewProvider(
    ColorProvider.viewType,
    colorProvider,
  );

  const disposableAddColor = vscode.commands.registerCommand(
    `${EXTENSION_ID}.colors.addColor`,
    () => {
      colorProvider.addColor();
    },
  );

  const disposableClearColors = vscode.commands.registerCommand(
    `${EXTENSION_ID}.colors.clearColors`,
    () => {
      colorProvider.clearColors();
    },
  );

  context.subscriptions.push(
    colorWebviewProvider,
    disposableAddColor,
    disposableClearColors,
  );

  // #endregion Color
}

// this method is called when your extension is deactivated
export function deactivate() {}
