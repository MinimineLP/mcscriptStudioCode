/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManager is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */

import * as fs from "fs";
import * as Path from "path";
import * as extract from "extract-zip";
import * as $ from "jquery";
import * as npmi from "npmi";
import * as SiteAPI from "./SiteApi";

declare let global;
let manager: PluginManager;

/**
 *
 */
global.srclocation = __dirname;

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
class PluginManager {
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
  constructor() {
    PluginManager.instance = this;
    this.plugins = [];
    this.api = new ServerApi(this);
    manager = this;
  }

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
  readyPluginDir(plugindir: string): void {
    if (!fs.existsSync(`${plugindir}/node_modules`))
      fs.mkdirSync(`${plugindir}/node_modules`);
    if (fs.existsSync(`${plugindir}/node_modules/@mcscriptstudiocode`))
      deleteFolderRecursive(`${plugindir}/node_modules/@mcscriptstudiocode`);
    copyFolderRecursiveSync(
      "types/@mcscriptstudiocode",
      `${plugindir}/node_modules`
    );
    if (fs.existsSync(`${plugindir}/node_modules/mcscriptstudiocode`))
      deleteFolderRecursive(`${plugindir}/node_modules/mcscriptstudiocode`);
    copyFolderRecursiveSync(
      "types/mcscriptstudiocode",
      `${plugindir}/node_modules`
    );
    if (fs.existsSync(`${plugindir}/node_modules/@mcscriptstudiocodeplugins`))
      deleteFolderRecursive(
        `${plugindir}/node_modules/@mcscriptstudiocodeplugins`
      );
    fs.mkdirSync(`${plugindir}/node_modules/@mcscriptstudiocodeplugins`);
  }

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
  async readyPlugin(
    plugindir: string,
    plugin: string,
    callback: CallbackFunction = function() {}
  ) {
    try {
      if (fs.existsSync(`${plugindir}/${plugin}/types`)) {
        let node_modules = `${plugindir}/node_modules`;
        if (!fs.existsSync(node_modules)) fs.mkdirSync(node_modules);
        if (!fs.existsSync(`${node_modules}/@mcscriptstudiocodeplugins`))
          fs.mkdirSync(`${node_modules}/@mcscriptstudiocodeplugins`);
        let dir = `${node_modules}/@mcscriptstudiocodeplugins/${plugin}`;
        if (fs.existsSync(dir)) deleteFolderRecursive(dir);
        fs.mkdirSync(dir);
        copyFolderRecursiveSync(`${plugindir}/${plugin}/types`, dir, false);
      }
      if (!fs.existsSync(`${plugindir}/${plugin}`)) return;
      var options = {
        path: `${plugindir}/${plugin}`,
        forceInstall: false,
        npmLoad: {
          loglevel: "silent",
          production: "true",
        }
      };
      npmi(options, function(err) {
        if (err) {
          if (callback) callback(err);
          if (err.code === npmi.LOAD_ERR) console.log("npm load error");
          else if (err.code === npmi.INSTALL_ERR)
            console.log("npm install error");
          return console.log(err.message);
        }

        if (callback) callback();

        // installed
        // console.log("Installed dependencies successfully in " + Path.resolve(options.path));
      });
    } catch (e) {
      callback(e);
      e.printStackTrace();
    }
  }

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
  loadPlugins(
    plugindir: string,
    callback: CallbackFunction = function() {}
  ): void {
    let THIS = this;
    THIS.readyPluginDir(plugindir);
    if (!fs.existsSync(plugindir)) fs.mkdirSync(plugindir);
    let plugins = this.getPlugins(plugindir);
    let x: boolean[] = [];
    plugins.forEach((e, i) => {
      x[i] = false;
      THIS.readyPlugin(plugindir, e, function() {
        x[i] = true;
        let ready = true;
        x.forEach(b => {
          if (!b) ready = false;
        });
        if (ready) {
          plugins.forEach(e => {
            THIS.plugins.push(THIS.loadPlugin(plugindir, e));
          });
          if (callback) callback();
        }
      });
    });
  }

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
  loadPlugin(plugindir: string, plugin: string): Plugin {
    if (!fs.existsSync(`${plugindir}/${plugin}/`))
      throw new Error(
        `Plugin ${plugin} does not exists in plugindir ${plugindir}`
      );

    if (fs.existsSync(`${plugindir}/${plugin}/types`)) {
      let node_modules = `${plugindir}/node_modules`;
      if (!fs.existsSync(node_modules)) fs.mkdirSync(node_modules);
      if (!fs.existsSync(`${node_modules}/@mcscriptstudiocodeplugins`))
        fs.mkdirSync(`${node_modules}/@mcscriptstudiocodeplugins`);
      let dir = `${node_modules}/@mcscriptstudiocodeplugins/${plugin}`;
      if (fs.existsSync(dir)) deleteFolderRecursive(dir);
      fs.mkdirSync(dir);
      copyFolderRecursiveSync(`${plugindir}/${plugin}/types`, dir, false);
    }

    let desc = this.getPluginDescription(plugindir, plugin);
    let { name, url, author, author_url, version, main } = desc;
    let dependencies: Dependency[] = [];
    if (desc.pluginDependencies) {
      for (let i in desc.pluginDependencies) {
        if (!fs.existsSync(plugindir + "/" + desc.pluginDependencies[i].name)) {
          console.log(
            "installing plugin " +
              desc.pluginDependencies[i].name +
              ' from "' +
              desc.pluginDependencies[i].url +
              '" caused of a dependency of plugin "' +
              name +
              '"'
          );
          this.installPlugin(desc.pluginDependencies[i].url, plugindir);
        }

        var dependency: Dependency = new Dependency(
          desc.pluginDependencies[i].name,
          desc.pluginDependencies[i].url,
          plugindir,
          name
        );
        dependencies.push(dependency);
      }
    }
    if (!fs.existsSync(`${plugindir}/${plugin}/${main}`))
      throw new Error(`Plugin main from plugin ${plugin} does not exists`);
    let Plugin = require(`${plugindir}/${plugin}/${main}`).default;
    return new Plugin(
      name,
      url,
      author,
      author_url,
      version,
      main,
      dependencies,
      `${plugindir}/${plugin}`
    );
  }

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
  setupPlugins(): void {
    for (let plugin of this.plugins) plugin.setup(this.api);
  }

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
  startPlugins(): void {
    for (let plugin of this.plugins) plugin.start(this.api);
  }

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
  stopPlugins(): void {
    for (let plugin of this.plugins) plugin.stop(this.api);
  }

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
  reloadPlugins(): void {
    for (let plugin of this.plugins) plugin.reload(this.api);
  }

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
  getPluginDescription(plugindir: string, plugin: string): any {
    try {
      return JSON.parse(
        fs.readFileSync(`${plugindir}/${plugin}/package.json`).toString()
      );
    } catch (e) {
      console.error(
        "Error reading plugindescription of plugin " + plugin + ": ",
        e
      );
      return {};
    }
  }

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
  getPlugins(plugindir): string[] {
    let ret = [];
    for (let i of fs.readdirSync(plugindir)) {
      if (
        fs.lstatSync(plugindir + "/" + i).isDirectory() &&
        i.toLowerCase() != "node_modules"
      )
        ret.push(i);
    }
    return ret;
  }

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
  fireEvent(event: Event): Event {
    return this.api.fireEvent(event);
  }

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
  installPlugin(url: string, pluginfolder: string) {
    let THIS = this;
    SiteAPI.loadSite(SiteAPI.parseURL(url), function(res) {
      res = JSON.parse(res);
      if (!fs.existsSync(pluginfolder + "/" + res.name)) {
        let zipfile: string = `${pluginfolder}/${res.name.toLowerCase()}.tmp.zip`;
        SiteAPI.downloadFile(
          zipfile,
          res.versions[res.newestversion],
          function() {
            extract(zipfile, { dir: `${pluginfolder}/${res.name.toLowerCase()}` }, function(
              err
            ) {
              if (err) console.error("Error installing plugin "+res.name+" from url "+url,err);
              else {
                fs.unlinkSync(zipfile);
                THIS.readyPlugin(pluginfolder, res.name);
              }
            });
          }
        );
      }
    });
  }
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
class ServerApi {
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
  listeners: Array<Listener> = [];

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
  apis: any = {};

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
  constructor(manager: PluginManager) {
    this.manager = manager;
    this.plugins = manager.plugins;
  }

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
  on(event: string, func: Function) {
    this.registerListener(new OnListener(event, func));
  }

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
  registerListener(listener: Listener) {
    this.listeners.push(listener);
  }

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
  fireEvent(event: Event): Event {
    let type = event.getType();
    for (let listener of this.listeners) {
      if (listener.getType() == type) {
        listener.run(event);
      }
    }
    return event;
  }

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
  addStylesheet(stylesheet: string) {
    if (!document.getElementById(stylesheet)) {
      var head: HTMLHeadElement = document.getElementsByTagName("head")[0];
      var link: HTMLLinkElement = document.createElement("link");
      link.id = stylesheet;
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = stylesheet;
      link.media = "all";
      head.appendChild(link);
    }
  }

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
  addScript(script: string) {
    console.warn(
      "Please use require(yourscript) instead of the deprecated method ServerApi#addScript()"
    );
    //console.log(`Loaded script from "${script}"`);
    if (!document.getElementById(script)) {
      var head: HTMLHeadElement = document.getElementsByTagName("head")[0];
      var link: HTMLScriptElement = document.createElement("script");
      link.id = script;
      link.type = "text/javascript";
      link.src = script;
      head.appendChild(link);
    }
  }

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
  addElement(element: string | HTMLElement) {
    if (element instanceof HTMLElement) document.body.appendChild(element);
    else $("body").append(element);
  }

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
  registerAPI(key: string, api: any): void {
    this.apis[key] = api;
  }

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
  getAPI(key: string): any {
    return this.apis[key];
  }
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
  ) {
    this.name = name;
    this.url = url;
    this.author = author;
    this.author_url = author_url;
    this.version = version;
    this.main = main;
    this.dependencies = dependencies;
    this.path = path;
  }

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
      manager.installPlugin(url, plugindir);
    if (fs.existsSync(`${plugindir}/${name}/`))
      this.plugin = manager.loadPlugin(plugindir, name);
    else
      throw new Error(
        `The dependency ${name} in ${requiredBy} has an wrong import!`
      );
  }
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
interface CancelableEvent extends Event {
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

/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Functions
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */

/**
 * @function CallbackFunction
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.3
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description A callback function type
 * @param err the error (Error | undefined)
 * @param res the result (String | undefined)
 *
 */
interface CallbackFunction {
  (err?: Error | undefined, res?: string | undefined): void;
}

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
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}

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
function copyFileSync(source, target) {
  var targetFile = target;
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = Path.join(target, Path.basename(source));
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

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
function copyFolderRecursiveSync(
  source: string,
  target: string,
  useOldName: boolean = true
) {
  var files = [];
  var targetFolder = target;
  if (useOldName) targetFolder = Path.join(target, Path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = Path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

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
function deleteFolderRecursive(path: fs.PathLike) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

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

// Make classes global usable
global.Plugin = Plugin;
global.ServerApi = ServerApi;
global.PluginManager = PluginManager;
global.Event = Event;
global.OnListener = OnListener;
global.guid = guid;
global.deleteFolderRecursive = deleteFolderRecursive;
global.copyFolderRecursiveSync = copyFolderRecursiveSync;
global.copyFileSync = copyFileSync;

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
  guid
};
