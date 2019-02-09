import * as Event from "./Event";

/**
 * @interface CancelableEvent
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description CancelableEvent Event
 * @extends Event
 *
 */
interface CancelableEvent extends Event {
  /**
   * @var canceled
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description saves if the event is canceled
   *
   */
  canceled: boolean;

  /**
   * @function cancel
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description cancels the Event (or the default reaction)
   *
   */
  cancel();
}

export default CancelableEvent;
export { CancelableEvent };
