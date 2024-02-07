import {
  Event,
  EventEmitter,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from 'vscode';
import { Node } from '../models';

/**
 * The FeedbackProvider class
 *
 * @class
 * @classdesc The class that represents the feedback provider.
 * @export
 * @public
 * @implements {TreeDataProvider<Node>}
 * @example
 * const provider = new FeedbackProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class FeedbackProvider implements TreeDataProvider<Node> {
  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<Node | undefined | null | void>}
   * @private
   * @memberof FeedbackProvider
   * @example
   * this._onDidChangeTreeData = new EventEmitter<Node | undefined | null | void>();
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#EventEmitter
   */
  private _onDidChangeTreeData: EventEmitter<Node | undefined | null | void>;
  /**
   * The onDidChangeTreeData event.
   * @type {Event<Node | undefined | null | void>}
   * @public
   * @memberof FeedbackProvider
   * @example
   * public readonly onDidChangeTreeData: Event<Node | undefined | null | void>;
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#Event
   */
  public readonly onDidChangeTreeData: Event<Node | undefined | null | void>;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FeedbackProvider class
   *
   * @public
   * @memberof FeedbackProvider
   */
  constructor() {
    this._onDidChangeTreeData = new EventEmitter<
      Node | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  /**
   * Returns the tree item for the supplied element.
   *
   * @param {Node} element - The element
   * @public
   * @memberof FeedbackProvider
   * @example
   * const treeItem = provider.getTreeItem(element);
   *
   * @returns {TreeItem | Thenable<TreeItem>} - The tree item
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getTreeItem(element: Node): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the children for the supplied element.
   *
   * @param {Node} [element] - The element
   * @public
   * @memberof FeedbackProvider
   * @example
   * const children = provider.getChildren(element);
   *
   * @returns {ProviderResult<Node[]>} - The children
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getChildren(element?: Node): ProviderResult<Node[]> {
    if (element) {
      return element.children;
    } else {
      return this.getFeedbacks();
    }
  }

  /**
   * Returns the feedbacks.
   *
   * @private
   * @memberof FeedbackProvider
   * @example
   * const feedbacks = this.getFeedbacks();
   *
   * @returns {Node[]} - The feedbacks
   */
  private getFeedbacks(): Node[] {
    return [
      new Node('About Us', TreeItemCollapsibleState.None, 'about', {
        title: 'About Us',
        command: 'extension-stater-kit.aboutUs',
      }),
      new Node('Documentation', TreeItemCollapsibleState.None, 'docs', {
        title: 'Documentation',
        command: 'extension-stater-kit.documentation',
      }),
      new Node('Report Issues', TreeItemCollapsibleState.None, 'issues', {
        title: 'Report Issues',
        command: 'extension-stater-kit.reportIssues',
      }),
      new Node('Rate Us', TreeItemCollapsibleState.None, 'rate', {
        title: 'Rate Us',
        command: 'extension-stater-kit.rateUs',
      }),
      new Node('Follow Us', TreeItemCollapsibleState.None, 'follow', {
        title: 'Follow Us',
        command: 'extension-stater-kit.followUs',
      }),
      new Node('Support Us', TreeItemCollapsibleState.None, 'support', {
        title: 'Support Us',
        command: 'extension-stater-kit.supportUs',
      }),
    ];
  }

  /**
   * Refreshes the tree data.
   *
   * @public
   * @memberof FeedbackProvider
   * @example
   * provider.refresh();
   *
   * @returns {void} - No return value
   */
  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
