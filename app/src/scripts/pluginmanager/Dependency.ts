import * as fs from "fs";
import { PluginManager } from "./PluginManager";

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
class Dependency {
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
  constructor(
    name: string,
    url: string,
    plugindir: string,
    requiredBy: string
  ) {
    this.name = name;
    this.url = url;
    if (!fs.existsSync(`${plugindir}/${name}/`))
      PluginManager.instance.installPlugin(url, plugindir);
    if (fs.existsSync(`${plugindir}/${name}/`))
      this.plugin = PluginManager.instance.loadPlugin(plugindir, name);
    else
      throw new Error(
        `The dependency ${name} in ${requiredBy} has an wrong import!`
      );
  }
}

export default Dependency;
export { Dependency };
