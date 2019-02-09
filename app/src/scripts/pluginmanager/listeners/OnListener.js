"use strict";

exports.__esModule = true;
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
var OnListener = /** @class */function () {
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
  function OnListener(trigger, func) {
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
  OnListener.prototype.run = function (event) {
    this.func(event);
  };
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
  OnListener.prototype.getType = function () {
    return this.trigger;
  };
  return OnListener;
}();
exports.OnListener = OnListener;
exports["default"] = OnListener;
//# sourceMappingURL=OnListener.js.map
