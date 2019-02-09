/**
 * @class Dependency
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description the dependency definition
 * @abstract
 *
 */
declare class Dependency {
  /**
   * @var name
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the dependencies name
   *
   */
  name: string;

  /**
   * @var name
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the dependencies name
   *
   */
  url: string;

  /**
   * @var plugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin
   *
   */
  plugin: Plugin;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructor for the Dependency class
   * @param name the plugin's name
   * @param url the plugin's url
   *
   */
  constructor(name: string, url: string, plugindir: string, requiredBy: string);
}

export default Dependency;
export { Dependency };
module.exports = { Dependency: Dependency, default: Dependency };
