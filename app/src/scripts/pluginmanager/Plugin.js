"use strict";

exports.__esModule = true;
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
var Plugin = /** @class */function () {
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
  function Plugin(name, url, author, author_url, version, main, dependencies, path, api) {
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
  return Plugin;
}();
exports.Plugin = Plugin;
exports["default"] = Plugin;
//# sourceMappingURL=Plugin.js.map
