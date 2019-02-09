import * as fs from "fs";
import * as npmi from "npmi";
import * as extract from "extract-zip";
import * as SiteAPI from "../SiteApi";
import PluginApi from "./PluginApi";
import Plugin from "./Plugin";
import Dependency from "./Dependency";
import Event from "./events/Event";
import * as Util from "../util";

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
  api: PluginApi;

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
    this.api = new PluginApi(this);
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
      Util.deleteFolderRecursive(
        `${plugindir}/node_modules/@mcscriptstudiocode`
      );
    Util.copyFolderRecursiveSync(
      __dirname + "/../../../types/@mcscriptstudiocode",
      `${plugindir}/node_modules`
    );
    if (fs.existsSync(`${plugindir}/node_modules/mcscriptstudiocode`))
      Util.deleteFolderRecursive(
        `${plugindir}/node_modules/mcscriptstudiocode`
      );
    Util.copyFolderRecursiveSync(
      __dirname + "/../../../types/mcscriptstudiocode",
      `${plugindir}/node_modules`
    );
    if (fs.existsSync(`${plugindir}/node_modules/@mcscriptstudiocodeplugins`))
      Util.deleteFolderRecursive(
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
  readyPlugin(
    plugindir: string,
    plugin: string,
    callback: Util.CallbackFunction = function() {}
  ) {
    try {
      if (fs.existsSync(`${plugindir}/${plugin}/types`)) {
        let node_modules = `${plugindir}/node_modules`;
        if (!fs.existsSync(node_modules)) fs.mkdirSync(node_modules);
        if (!fs.existsSync(`${node_modules}/@mcscriptstudiocodeplugins`))
          fs.mkdirSync(`${node_modules}/@mcscriptstudiocodeplugins`);
        let dir = `${node_modules}/@mcscriptstudiocodeplugins/${plugin}`;
        if (fs.existsSync(dir)) Util.deleteFolderRecursive(dir);
        fs.mkdirSync(dir);
        Util.copyFolderRecursiveSync(
          `${plugindir}/${plugin}/types`,
          dir,
          false
        );
      }
      if (!fs.existsSync(`${plugindir}/${plugin}`)) return;
      var options = {
        path: `${plugindir}/${plugin}`,
        forceInstall: false,
        npmLoad: {
          loglevel: "silent",
          production: "true"
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
    callback: Util.CallbackFunction = function() {}
  ): void {
    let THIS = this;
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
      if (fs.existsSync(dir)) Util.deleteFolderRecursive(dir);
      fs.mkdirSync(dir);
      Util.copyFolderRecursiveSync(`${plugindir}/${plugin}/types`, dir, false);
    }

    let desc = this.getPluginDescription(plugindir, plugin);
    let { name, url, author, version, main } = desc,
      author_url = desc["author-url"];
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
      `${plugindir}/${plugin}`,
      this.api
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
    for (let plugin of this.plugins) plugin.setup();
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
    for (let plugin of this.plugins) plugin.start();
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
    for (let plugin of this.plugins) plugin.stop();
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
    for (let plugin of this.plugins) plugin.reload();
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
  installPlugin(
    url: string,
    pluginfolder: string,
    callback: Util.CallbackFunction = function() {}
  ): boolean {
    let THIS = this;
    let ret = false;
    SiteAPI.loadSite(SiteAPI.parseURL(url), function(res) {
      res = JSON.parse(res);
      if (!fs.existsSync(pluginfolder + "/" + res.name)) {
        ret = true;
        let zipfile: string = `${pluginfolder}/${res.name.toLowerCase()}.tmp.zip`;
        SiteAPI.downloadFile(zipfile, res.versions[res.newestversion]).then(
          function() {
            extract(
              zipfile,
              { dir: `${pluginfolder}/${res.name.toLowerCase()}` },
              function(err) {
                if (err)
                  console.error(
                    "Error installing plugin " + res.name + " from url " + url,
                    err
                  );
                else {
                  fs.unlinkSync(zipfile);
                  THIS.readyPlugin(pluginfolder, res.name, function() {
                    callback(null, true);
                  });
                }
              }
            );
          }
        );
      } else {
        callback(null, false);
      }
    });
    return ret;
  }
}

export default PluginManager;
export { PluginManager };
