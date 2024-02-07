import { Command, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';

/**
 * The Node class
 *
 * @class
 * @classdesc The class that represents a node in the tree view.
 * @export
 * @public
 * @property {string} label - The label of the node
 * @property {TreeItemCollapsibleState} collapsibleState - The collapsible state of the node
 * @property {string} icon - The icon of the node
 * @property {Command} [command] - The command of the node
 * @property {Uri} [uri] - The URI of the node
 * @property {Node[]} [children] - The children of the node
 * @example
 * const node = new Node('About Us', TreeItemCollapsibleState.None, 'about', {
 *  title: 'About Us',
 *  command: 'extension-stater-kit.aboutUs',
 * });
 *
 * @see https://code.visualstudio.com/api/references/vscode-api#TreeItem
 */
export class Node implements TreeItem {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Node class
   *
   * @param {string} label - The label of the node
   * @param {TreeItemCollapsibleState} collapsibleState - The collapsible state of the node
   * @param {string} icon - The icon of the node
   * @param {Command} [command] - The command of the node
   * @param {Uri} [uri] - The URI of the node
   * @param {Node[]} [children] - The children of the node
   * @public
   * @memberof Node
   */
  constructor(
    public readonly label: string,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly icon: string,
    public readonly command?: Command,
    public readonly uri?: Uri,
    public readonly children?: Node[],
  ) {}
}
