import {
  Event,
  EventEmitter,
  ProviderResult,
  ThemeIcon,
  TreeDataProvider,
  TreeItem,
} from 'vscode';

import { NodeModel } from '../models';
import { FeedbackController } from '../controllers';

/**
 * The FeedbackProvider class
 *
 * @class
 * @classdesc The class that represents the feedback provider.
 * @export
 * @public
 * @implements {TreeDataProvider<NodeModel>}
 * @property {EventEmitter<NodeModel | undefined | null | void>} _onDidChangeTreeData - The onDidChangeTreeData event emitter
 * @property {Event<NodeModel | undefined | null | void>} onDidChangeTreeData - The onDidChangeTreeData event
 * @property {FeedbackController} controller - The feedback controller
 * @example
 * const provider = new FeedbackProvider();
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
 */
export class FeedbackProvider implements TreeDataProvider<NodeModel> {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The onDidChangeTreeData event emitter.
   * @type {EventEmitter<NodeModel | undefined | null | void>}
   * @private
   * @memberof FeedbackProvider
   * @example
   * this._onDidChangeTreeData = new EventEmitter<Node | undefined | null | void>();
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#EventEmitter
   */
  private _onDidChangeTreeData: EventEmitter<
    NodeModel | undefined | null | void
  >;

  // Public properties
  /**
   * The onDidChangeTreeData event.
   * @type {Event<NodeModel | undefined | null | void>}
   * @public
   * @memberof FeedbackProvider
   * @example
   * readonly onDidChangeTreeData: Event<Node | undefined | null | void>;
   * this.onDidChangeTreeData = this._onDidChangeTreeData.event;
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#Event
   */
  readonly onDidChangeTreeData: Event<NodeModel | undefined | null | void>;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FeedbackProvider class
   *
   * @public
   * @memberof FeedbackProvider
   */
  constructor(readonly controller: FeedbackController) {
    this._onDidChangeTreeData = new EventEmitter<
      NodeModel | undefined | null | void
    >();
    this.onDidChangeTreeData = this._onDidChangeTreeData.event;
  }

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Returns the tree item for the supplied element.
   *
   * @param {NodeModel} element - The element
   * @public
   * @memberof FeedbackProvider
   * @example
   * const treeItem = provider.getTreeItem(element);
   *
   * @returns {TreeItem | Thenable<TreeItem>} - The tree item
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getTreeItem(element: NodeModel): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /**
   * Returns the children for the supplied element.
   *
   * @param {NodeModel} [element] - The element
   * @public
   * @memberof FeedbackProvider
   * @example
   * const children = provider.getChildren(element);
   *
   * @returns {ProviderResult<NodeModel[]>} - The children
   *
   * @see https://code.visualstudio.com/api/references/vscode-api#TreeDataProvider
   */
  getChildren(element?: NodeModel): ProviderResult<NodeModel[]> {
    if (element) {
      return element.children;
    } else {
      return this.getFeedbacks();
    }
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

  // Private methods
  /**
   * Returns the feedbacks.
   *
   * @private
   * @memberof FeedbackProvider
   * @example
   * const feedbacks = this.getFeedbacks();
   *
   * @returns {NodeModel[]} - The feedbacks
   */
  private getFeedbacks(): NodeModel[] {
    return [
      new NodeModel('About Us', new ThemeIcon('info'), {
        title: 'About Us',
        command: 'extension-starter-kit.feedback.aboutUs',
      }),
      new NodeModel('Documentation', new ThemeIcon('book'), {
        title: 'Documentation',
        command: 'extension-starter-kit.feedback.documentation',
      }),
      new NodeModel('Report Issues', new ThemeIcon('bug'), {
        title: 'Report Issues',
        command: 'extension-starter-kit.feedback.reportIssues',
      }),
      new NodeModel('Rate Us', new ThemeIcon('star'), {
        title: 'Rate Us',
        command: 'extension-starter-kit.feedback.rateUs',
      }),
      new NodeModel('Follow Us', new ThemeIcon('twitter'), {
        title: 'Follow Us',
        command: 'extension-starter-kit.feedback.followUs',
      }),
      new NodeModel('Support Us', new ThemeIcon('heart'), {
        title: 'Support Us',
        command: 'extension-starter-kit.feedback.supportUs',
      }),
    ];
  }
}
