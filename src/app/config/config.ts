import { WorkspaceConfiguration } from 'vscode';
import { EXCLUDE, INCLUDE } from './constants';

/**
 * The Config class.
 *
 * @class
 * @classdesc The class that represents the configuration of the extension.
 * @export
 * @public
 * @property {string[]} include - The files to include
 * @property {string[]} exclude - The files to exclude
 * @example
 * const config = new Config(workspace.getConfiguration());
 * console.log(config.include);
 * console.log(config.exclude);
 */
export class Config {
  // Public properties
  /**
   * The files to include.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.include);
   */
  public include: string[];

  /**
   * The files to exclude.
   * @type {string[]}
   * @public
   * @memberof Config
   * @example
   * const config = new Config(workspace.getConfiguration());
   * console.log(config.exclude);
   */
  public exclude: string[];

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the Config class.
   *
   * @param {WorkspaceConfiguration} config - The workspace configuration
   * @public
   * @memberof Config
   */
  constructor(config: WorkspaceConfiguration) {
    this.include = config.get<string[]>('files.include') ?? INCLUDE;
    this.exclude = config.get<string[]>('files.exclude') ?? EXCLUDE;
  }
}
