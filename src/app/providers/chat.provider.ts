import {
  CancellationToken,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  WebviewViewResolveContext,
} from 'vscode';

import { EXTENSION_ID } from '../configs';
import { getNonce } from '../helpers';
import { OpenAIService } from '../services';

/**
 * The ChatProvider class.
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
 * const provider = new ChatProvider(extensionUri);
 */
export class ChatProvider implements WebviewViewProvider {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Public properties
  /**
   * The view type.
   *
   * @public
   * @static
   * @memberof ChatProvider
   * @type {string}
   */
  static readonly viewType: string = `${EXTENSION_ID}.chatView`;

  // Private properties
  /**
   * The view.
   *
   * @private
   * @memberof ChatProvider
   * @type {WebviewView}
   */
  private _view?: WebviewView;

  /**
   * The OpenAI service.
   *
   * @private
   * @memberof ChatProvider
   * @type {OpenAIService}
   */
  private openAISservice?: OpenAIService;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ChatProvider class.
   *
   * @constructor
   * @param {Uri} _extensionUri - The extension URI
   * @public
   * @memberof ChatProvider
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
   * @memberof ChatProvider
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
        case 'sendMessage': {
          this.response(data);
          break;
        }
      }
    });
  }

  /**
   * The setService method.
   *
   * @function setService
   * @param {OpenAIService} service - The service
   * @public
   * @memberof ChatProvider
   * @example
   * provider.setService(service);
   *
   * @returns {void} - No return value
   */
  setService(service: OpenAIService): void {
    this.openAISservice = service;
  }

  /**
   * The response method.
   *
   * @function response
   * @param {any} data - The data
   * @public
   * @memberof ChatProvider
   * @example
   * provider.response(data);
   *
   * @returns {void} - No return value
   */
  response(data: any): void {
    if (this._view) {
      this.openAISservice?.completion(data.value).then((response) => {
        this._view?.webview.postMessage({
          type: 'receiveMessage',
          value: response.choices[0].message.content,
        });
      });
    }
  }

  // Private methods
  /**
   * The _getHtmlForWebview method.
   *
   * @function _getHtmlForWebview
   * @param {Webview} webview - The webview
   * @private
   * @memberof ChatProvider
   * @example
   * const html = provider._getHtmlForWebview(webview);
   *
   * @returns {string} - The HTML for the webview
   */
  private _getHtmlForWebview(webview: Webview): string {
    // Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets/chat', 'main.js'),
    );

    // Do the same for the stylesheet.
    const styleResetUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets', 'reset.css'),
    );
    const styleVSCodeUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets', 'vscode.css'),
    );
    const styleMainUri = webview.asWebviewUri(
      Uri.joinPath(this._extensionUri, './assets/chat', 'main.css'),
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
    <div class="messages">
      <ul class="message-list">
        <li class="message-item item-primary"><strong>Bot:</strong> How can I help you today?</li>
      </ul>
      <div class="message-input">
        <input type="text" placeholder="Type your message..." />
        <button type="button" class="btn"><i class="codicon codicon-send"></i></button>
      </div>
    </div>

    <script nonce="${nonce}" src="${scriptUri}"></script>
  </body>
</html>
`;
  }
}
