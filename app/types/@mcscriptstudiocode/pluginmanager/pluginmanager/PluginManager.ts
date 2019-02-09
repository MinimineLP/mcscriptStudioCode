import ServerApi from "./ServerApi";
import Plugin from "./Plugin";
import Event from "./events/Event";
import * as Util from "../../util";

/**
 * @class PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description The manager for the plugins
 *
 */
declare class PluginManager {
  static instance: PluginManager;

  /**
   * @var plugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The loaded plugins
   *
   */
  plugins: Plugin[];

  /**
   * @var api
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The api
   *
   */
  api: ServerApi;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructor for Class PluginManager
   *
   */
  constructor();

  /**
   * @function readyPluginDir
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description makes the plugins ready
   *
   */
  readyPluginDir(plugindir: string): void;

  /**
   * @function readyPlugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description makes a plugin ready
   *
   */
  readyPlugin(
    plugindir: string,
    plugin: string,
    callback?: Util.CallbackFunction
  );

  /**
   * @function loadPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description Loads the plugins
   *
   */
  loadPlugins(plugindir: string, callback?: Util.CallbackFunction): void;

  /**
   * @function loadPlugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Loads a Plugin
   * @param plugin the Plugin to load
   * @return the plugin main file default class
   *
   */
  loadPlugin(plugindir: string, plugin: string): Plugin;

  /**
   * @function setupPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description setups the plugins
   *
   */
  setupPlugins(): void;

  /**
   * @function startPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Starts the plugins
   *
   */
  startPlugins(): void;

  /**
   * @function stopPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description stops the plugins
   *
   */
  stopPlugins(): void;

  /**
   * @function reloadPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description reloads the plugins
   *
   */
  reloadPlugins(): void;

  /**
   * @function getPluginDescription
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description returns the description of a plugin
   * @param plugin the Plugin to load
   * @return the package.json content
   *
   */
  getPluginDescription(plugindir: string, plugin: string): any;

  /**
   * @function getPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description scans for plugins in the plugindir
   * @return the plugins in the plugindir
   *
   */
  getPlugins(plugindir): string[];

  /**
   * @function fireEvent
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   * @description register a listener
   *
   * @param event the Event to fire
   */
  fireEvent(event: Event): Event;

  /**
   * @function installPlugin
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   * @description install a plugin (by url into pluginfolder)
   *
   * @param url the url
   * @param pluginfolder the pluginfoder
   */
  installPlugin(
    url: string,
    pluginfolder: string,
    callback?: Util.CallbackFunction
  ): boolean;
}

export default PluginManager;
export { PluginManager };
module.exports = { PluginManager: PluginManager, default: PluginManager };
