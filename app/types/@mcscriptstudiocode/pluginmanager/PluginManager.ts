/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManager is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */

import * as fs from "fs";

/**
 * @class PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
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
  readyPlugin(plugindir: string, plugin: string);

  /**
   * @function readyPluginDir
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description Loads the plugins
   *
   */
  readyPluginDir(plugindir: string): void;

  /**
   * @function loadPlugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   *
   * @copyright (c) Minimine 2018
   * @description Loads the plugins
   *
   */
  loadPlugins(plugindir: string): void;

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
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   * @description install a plugin (by url into pluginfolder)
   *
   * @param url the url
   * @param pluginfolder the pluginfoder
   */
  installPlugin(url: string, pluginfolder: string);
}

/**
 * @class ServerApi
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description The Api to manage the server
 *
 */
declare class ServerApi {
  /**
   * @var listeners
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description contains the listeners
   *
   */
  listeners: Array<Listener>;

  /**
   * @var apis
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description the api register (can be got)
   *
   */
  apis: any;

  /**
   * @var manager
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The the plugin manager
   *
   */
  manager: PluginManager;

  /**
   * @var plugins
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description All the registered Plugins
   *
   */
  plugins: Plugin[];

  /**
   * @function constructor
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.3
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description Constructorclass for the ServerApi
   */
  constructor(manager: PluginManager);

  /**
   * @function on
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a function as listener by event name
   * @deprecated Use ServerApi#registerListener(Listener)
   * @param event the event to listen for
   * @param func the function to execute when event appears
   */
  on(event: string, func: Function);

  /**
   * @function registerListener
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a listener
   * @param listener the listener to register
   */
  registerListener(listener: Listener);

  /**
   * @function fireEvent
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description register a listener
   * @param event the Event to fire
   *
   */
  fireEvent(event: Event): Event;

  /**
   * @function addStylesheet
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description loads a css stylesheet via a <link> tag
   * @param stylesheet the script path
   *
   */
  addStylesheet(stylesheet: string);

  /**
   * @function addScript
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @deprecated please use require(yourscript) instead
   * @description loads a javascript via a <script src="yourscript"></script>
   * @param script the element's path
   *
   */
  addScript(script: string);

  /**
   * @function addElement
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.3
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description adds an element to the document's body
   * @param element the element to add
   *
   */
  addElement(element: string | HTMLElement);

  /**
   * @function registerAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description register a api
   * @param key the api key
   * @param api the api
   */
  registerAPI(key: string, api: any): void;

  /**
   * @function getAPI
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018

   * @description get a api
   * @param key the api key
   * @return the api
   */
  getAPI(key: string): any;
}

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
declare abstract class Plugin {
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
    path: string
  );

  /**
   * @function setup
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The setup method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract setup(server: ServerApi);

  /**
   * @function start
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The start method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract start(server: ServerApi);

  /**
   * @function register
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The stop method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract stop(server: ServerApi);

  /**
   * @function register
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.2
   * @version 0.0.2
   * @license MIT
   * @copyright (c) Minimine 2018
   *
   * @description The reload method for the plugin
   * @param server the server APIs
   * @abstract
   *
   */
  abstract reload(server: ServerApi);
}

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

/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Events
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */

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
declare interface Event {
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
declare interface CancelableEvent extends Event {
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

/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Listeners
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */

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
declare interface Listener {
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
declare class OnListener implements Listener {
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
  constructor(trigger: string, func: Function);

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
  run(event: Event);

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
  getType(): string;
}

/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Functions
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */

/**
 * @function guid
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.1
 * @version 0.0.1
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description returns a random uuid
 * @return random uuid
 *
 */
declare function guid();

/**
 * @function copyFileSync
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description copys a file
 * @param source the source file
 * @param target the paste target
 *
 */
declare function copyFileSync(source, target);

/**
 * @function copyFolderRecursiveSync
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description copys a folder recursively
 * @param source the source folder
 * @param target the paste target
 * @param useOldName should a sub folder created with the old name? default: true
 *
 */
declare function copyFolderRecursiveSync(
  source: string,
  target: string,
  useOldName?: boolean
);

/**
 * @function deleteFolderRecursive
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description deletes a folder recursively
 * @param path the folder to delete
 *
 */
declare function deleteFolderRecursive(path: fs.PathLike);

/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Static
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */

/*
  **********************************************************************************************************************************
  **********************************************************************************************************************************
  Exports
  **********************************************************************************************************************************
  **********************************************************************************************************************************
  */
// Export and return on require / import
export default PluginManager;

export {
  // Standart APIs
  Plugin,
  ServerApi,
  PluginManager,
  // Events
  Event,
  CancelableEvent,
  // Listeners
  Listener,
  OnListener,
  // Functions
  guid,
  deleteFolderRecursive,
  copyFolderRecursiveSync,
  copyFileSync
};

module.exports = {
  // Standart APIs
  Plugin: Plugin,
  ServerApi: ServerApi,
  PluginManager: PluginManager,

  // Events
  Event: Event,

  // Listeners
  OnListener: OnListener,

  // Functions
  guid: guid,
  deleteFolderRecursive: deleteFolderRecursive,
  copyFolderRecursiveSync: copyFolderRecursiveSync,
  copyFileSync: copyFileSync
};
