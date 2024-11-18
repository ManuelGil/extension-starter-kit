import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';

import { ExtensionConfig } from '../configs';

/**
 * The OpenAIService class.
 *
 * @class
 * @classdesc The class that represents the OpenAI service.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @property {OpenAI} openai - The OpenAI instance
 * @example
 * const service = new OpenAIService(config);
 * console.log(service.openai);
 */
export class OpenAIService {
  // -----------------------------------------------------------------
  // Properties
  // -----------------------------------------------------------------

  // Private properties
  /**
   * The OpenAI instance.
   * @type {OpenAI}
   * @public
   * @memberof OpenAIService
   * @example
   * const service = new OpenAIService(config);
   * console.log(service.openai);
   *
   * @returns {OpenAI} - The OpenAI instance
   */
  private openai?: OpenAI;

  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the OpenAIService class
   *
   * @constructor
   * @public
   * @memberof OpenAIService
   */
  constructor(private readonly config: ExtensionConfig) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The completion method
   *
   * @function completion
   * @param {string} prompt - The prompt
   * @public
   * @async
   * @memberof OpenAIService
   * @example
   * service.completion('Once upon a time', 'davinci');
   *
   * @returns {Promise<ChatCompletion>} - The completion
   */
  async completion(prompt: string): Promise<ChatCompletion> {
    return await this.getInstance().chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      model: this.config.openai.model,
    });
  }

  // Private methods
  /**
   * The getInstance method
   *
   * @function getInstance
   * @memberof OpenAIService
   * @example
   * service.getInstance();
   *
   * @returns {OpenAI} - The OpenAI instance
   */
  private getInstance(): OpenAI {
    if (!this.openai) {
      this.openai = new OpenAI({ apiKey: this.config.openai.apiKey });
    }

    return this.openai;
  }
}
