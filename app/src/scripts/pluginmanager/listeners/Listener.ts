import Event from "../events/Event";

/**
 * @interface Listener
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description The Listener inteface.
 */
interface Listener {
  /**
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description get the listener type (the event the listener is waiting for)
   * @return the type
   *
   */
  getType(): string;

  /**
   * @function run
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Runs the listener
   * @param event the Event
   *
   */
  run(event: Event): void;
}

export default Listener;
export { Listener };
