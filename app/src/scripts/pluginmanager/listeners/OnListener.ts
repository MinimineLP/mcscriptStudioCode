import Listener from "./Listener";
import Event from '../events/Event'

/**
 * @class OnListener
 * @implements Listener
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description Listening for a event by name (deprecated)
 * @deprecated on-Listeners are deprecated, make Listeners from the Listener interface
 *
 */
class OnListener implements Listener {
  /**
   * @var trigger
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the trigger event
   *
   */
  trigger: string;

  /**
   * @var func
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Executed when event apears
   *
   */
  func: Function;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the constructor vor OnListener
   * @param trigger the trigger
   * @param func the Function to execute when the event apears
   *
   */
  constructor(trigger: string, func: Function) {
    this.trigger = trigger;
    this.func = func;
  }

  /**
   * @see Listener#run
   *
   * @function run
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description executed when the event apears
   * @param event the event
   *
   */
  run(event: Event) {
    this.func(event);
  }

  /**
   * @see Listener#getType
   *
   * @function getType
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description returns the type of the event
   * @return the Event type
   */
  getType(): string {
    return this.trigger;
  }
}

export default OnListener;
export { OnListener };
