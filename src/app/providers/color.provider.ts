import {
  CancellationToken,
  SnippetString,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
  window,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { getNonce } from '../helpers';

/**
 * The ColorProvider class.
 *
 * @class
 * @classdesc The class that represents the chat provider.
 * @export
 * @public
 * @implements {WebviewViewProvider}
 * @property {string} static viewType - The view type
 * @property {WebviewView} [_view] - The view
 * @property {OpenAIService} [openAISservice] - The OpenAI service
 * @example
 * const provider = new ColorProvider(extensionUri);
 */
export class ColorProvider implements WebviewViewProvider {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The view type.
   *
   * @public
   * @static
   * @memberof ColorProvider
   * @type {string}
   */
  static readonly viewType: string = `${EXTENSION_ID}.colorView`;

  // Private properties
  /**
   * The view.
   *
   * @private
   * @memberof ColorProvider
   * @type {WebviewView}
   */
  private _view?: WebviewView;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ColorProvider class.
   *
   * @constructor
   * @param {Uri} _extensionUri - The extension URI
   * @public
   * @memberof ColorProvider
   */
  constructor(private readonly _extensionUri: Uri) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The resolveWebviewView method.
   *
   * @function resolveWebviewView
   * @param {WebviewView} webviewView - The webview view
   * @param {WebviewViewResolveContext} context - The webview view resolve context
   * @param {CancellationToken} _token - The cancellation token
   * @public
   * @memberof ColorProvider
   * @example
   * provider.resolveWebviewView(webviewView, context, _token);
   *
   * @returns {void} - No return value
   */
  resolveWebviewView(
    webviewView: WebviewView,
    _: WebviewViewResolveContext,
    _token: CancellationToken,
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case 'colorSelected': {
          window.activeTextEditor?.insertSnippet(
            new SnippetString(`#${data.value}`),
          );
          break;
        }
      }
    });
  }

  /**
   * The addColor method.
   *
   * @function addColor
   * @public
   * @memberof ColorProvider
   * @example
   * provider.addColor();
   *
   * @returns {void} - No return value
   */
  addColor() {
    if (this._view) {
      this._view.show?.(true); // `show` is not implemented in 1.49 but is for 1.50 insiders
      this._view.webview.postMessage({ type: 'addColor' });
    }
  }

  /**
   * The clearColors method.
   *
   * @function clearColors
   * @public
   * @memberof ColorProvider
   * @example
   * provider.clearColors();
   *
   * @returns {void} - No return value
   */
  clearColors() {
    if (this._view) {
      this._view.webview.postMessage({ type: 'clearColors' });
    }
  }

  // Private methods
  /**
   * The _getHtmlForWebview method.
   *
   * @function _getHtmlForWebview
   * @param {Webview} webview - The webview
   * @private
   * @memberof ColorProvider
   * @example
   * const html = provider._getHtmlForWebview(webview);
   *
   * @returns {string} - The HTML for the webview
   */
  private _getHtmlForWebview(webview: Webview): string {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets/color', 'main.js'),
    );

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets', 'reset.css'),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets', 'vscode.css'),
    );
    const styleMainUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets/color', 'main.css'),
    );

    // And the codicons.
    const codiconsUri = webview.asWebviewUri(
      Uri.joinPath(
        this._extensionUri,
        'node_modules',
        '@vscode/codicons',
        'dist',
        'codicon.css',
      ),
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!--
      Use a content security policy to only allow loading styles from our extension directory,
      and only allow scripts that have a specific nonce.
      (See the 'webview-sample' extension sample for img-src content security policy examples)
    -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; font-src ${webview.cspSource}; style-src ${webview.cspSource};
      script-src 'nonce-${nonce}';"
    />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link href="${styleResetUri}" rel="stylesheet">
    <link href="${styleVSCodeUri}" rel="stylesheet">
    <link href="${styleMainUri}" rel="stylesheet" />
    <link href="${codiconsUri}" rel="stylesheet" />

    <title>Chat</title>
  </head>
  <body>
    <ul class="color-list">
    </ul>

    <button class="add-color-button">Add Color</button>

    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>
`;
  }
}
