import Dependency from "./Dependency";
import PluginApi from "./PluginApi";

/**
 * @class Plugin
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description the plugin definition
 * @abstract
 *
 */
abstract class Plugin {
  /**
   * @var name
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's name
   *
   */
  name: string;

  /**
   * @var url
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's url
   *
   */
  url: string;

  /**
   * @var author
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's author(s)
   *
   */
  author: string | string[];

  /**
   * @var author_url
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin authors's url(s)
   *
   */
  author_url: string | string[];

  /**
   * @var version
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's version
   *
   */
  version: string;

  /**
   * @var main
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's main file
   *
   */
  main: string;

  /**
   * @var dependencies
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's dependencies
   *
   */
  dependencies: Dependency[];

  /**
   * @var path
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin's path
   *
   */
  path: string;

  /**
   * @var api
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the plugin api
   *
   */
  readonly api: PluginApi;

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructor for the Plugin class
   * @param name the plugin's name
   * @param url the plugin's url
   * @param author the plugin's author(s)
   * @param author_url the plugin author's url(s)
   * @param version the plugin's version
   * @param main the plugin's main file
   *
   */
  constructor(
    name: string,
    url: string,
    author: string | string[],
    author_url: string | string[],
    version: string,
    main: string,
    dependencies: Dependency[],
    path: string,
    api: PluginApi
  ) {
    this.name = name;
    this.url = url;
    this.author = author;
    this.author_url = author_url;
    this.version = version;
    this.main = main;
    this.dependencies = dependencies;
    this.path = path;
    this.api = api;
  }

  /**
   * @function setup
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The setup method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract setup();

  /**
   * @function start
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The start method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract start();

  /**
   * @function stop
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The stop method for the plugin
   * @abstract
   *
   */
  abstract stop();

  /**
   * @function reload
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The reload method for the plugin
   * @abstract
   *
   */
  abstract reload();
}

export default Plugin;
export { Plugin };
