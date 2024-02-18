import { Uri } from 'vscode';

// Import the Config and helper functions
import { ExtensionConfig } from '../configs';
import {
  directoryMap,
  getPath,
  getRelativePath,
  saveFile,
  showMessage,
} from '../helpers';

/**
 * The ExampleController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @property {ExtensionConfig} config - The configuration
 * @example
 * const controller = new ExampleController(config);
 */
export class ExampleController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the ExampleController class.
   *
   * @constructor
   * @param {ExtensionConfig} config - The configuration
   * @public
   * @memberof ExampleController
   */
  constructor(private readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The helloWorld method.
   *
   * @function helloWorld
   * @public
   * @memberof ExampleController
   * @example
   * controller.helloWorld();
   *
   * @returns {void} - No return value
   */
  helloWorld(): void {
    // Display a message box to the user
    showMessage('Hello World from extension-starter-kit!');
  }

  /**
   * The getFilesInFolder method.
   *
   * @function getFilesInFolder
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof ExampleController
   * @example
   * controller.getFilesInFolder();
   *
   * @returns {Promise<void>} - The promise with no return value
   */
  async getFilesInFolder(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Type the folder name to search for files:',
      'Folder name',
      folderPath,
      (path: string) => {
        if (!/^\/|([\/\w-]+)+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    // If the folder is not valid, return
    if (!folder) {
      return;
    }

    // Get the files in the folder
    const files = await directoryMap(folder, {
      extensions: this.config.include,
      ignore: this.config.exclude,
      maxResults: 512,
    });

    // If files are found, save them to a file
    if (files.length > 0) {
      // Write the content to a file
      const result = await saveFile(
        folder,
        'files.json',
        JSON.stringify(files, null, 2),
      );

      // If the file is written, show a message
      if (result) {
        showMessage('Files found and saved to files.json');
      }
    }
  }
}
