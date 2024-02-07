import { MessageItem, Uri, env, window } from 'vscode';

import {
  EXTENSION_BUGS_URL,
  EXTENSION_DOCUMENTATION_URL,
  EXTENSION_HOMEPAGE_URL,
  EXTENSION_MARKETPLACE_URL,
  EXTENSION_PAYPAL_URL,
  EXTENSION_SOCIAL_MEDIA_URL,
  EXTENSION_SPONSOR_URL,
} from '../config';

/**
 * The FeedbackController class.
 *
 * @class
 * @classdesc The class that represents the feedback controller.
 * @export
 * @public
 * @example
 * const controller = new FeedbackController();
 */
export class FeedbackController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FeedbackController class.
   *
   * @public
   * @memberof FeedbackController
   */
  constructor() {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The aboutUs method.
   *
   * @public
   * @memberof FeedbackController
   */
  aboutUs() {
    env.openExternal(Uri.parse(EXTENSION_HOMEPAGE_URL));
  }

  /**
   * The documentation method.
   *
   * @public
   * @memberof FeedbackController
   */
  documentation() {
    env.openExternal(Uri.parse(EXTENSION_DOCUMENTATION_URL));
  }

  /**
   * The reportIssues method.
   *
   * @public
   * @memberof FeedbackController
   */
  reportIssues() {
    env.openExternal(Uri.parse(EXTENSION_BUGS_URL));
  }

  /**
   * The rateUs method.
   *
   * @public
   * @memberof FeedbackController
   */
  rateUs() {
    env.openExternal(
      Uri.parse(`${EXTENSION_MARKETPLACE_URL}&ssr=false#review-details`),
    );
  }

  /**
   * The followUs method.
   *
   * @public
   * @memberof FeedbackController
   */
  followUs() {
    env.openExternal(Uri.parse(EXTENSION_SOCIAL_MEDIA_URL));
  }

  /**
   * The supportUs method.
   *
   * @public
   * @memberof FeedbackController
   */
  async supportUs() {
    // Create the actions
    const actions: MessageItem[] = [
      { title: 'Become a Sponsor' },
      { title: 'Donate via PayPal' },
    ];

    // Show the message
    const option = await window.showInformationMessage(
      `While Project Manager is offered for free, if you
        find it useful, please consider supporting it. Thank you!`,
      ...actions,
    );

    // Handle the actions
    switch (option?.title) {
      case actions[0].title:
        env.openExternal(Uri.parse(EXTENSION_SPONSOR_URL));
        break;

      case actions[1].title:
        env.openExternal(Uri.parse(EXTENSION_PAYPAL_URL));
        break;
    }
  }
}
