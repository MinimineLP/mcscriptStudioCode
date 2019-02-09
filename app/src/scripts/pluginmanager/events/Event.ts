/**
 * @interface Event
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description Event interface
 *
 */
interface Event {
  /**
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Returns the event's type
   *
   */
  getType(): string;
}

export default Event;
export { Event };
