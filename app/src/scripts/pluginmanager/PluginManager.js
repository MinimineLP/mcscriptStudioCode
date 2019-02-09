"use strict";

exports.__esModule = true;
var fs = require("fs");
var npmi = require("npmi");
var extract = require("extract-zip");
var SiteAPI = require("../SiteApi");
var PluginApi_1 = require("./PluginApi");
var Dependency_1 = require("./Dependency");
var Util = require("../util");
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
var PluginManager = /** @class */function () {
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
    function PluginManager() {
        PluginManager.instance = this;
        this.plugins = [];
        this.api = new PluginApi_1["default"](this);
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
    PluginManager.prototype.readyPluginDir = function (plugindir) {
        if (!fs.existsSync(plugindir + "/node_modules")) fs.mkdirSync(plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/@mcscriptstudiocode")) Util.deleteFolderRecursive(plugindir + "/node_modules/@mcscriptstudiocode");
        Util.copyFolderRecursiveSync(__dirname + "/../../../types/@mcscriptstudiocode", plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/mcscriptstudiocode")) Util.deleteFolderRecursive(plugindir + "/node_modules/mcscriptstudiocode");
        Util.copyFolderRecursiveSync(__dirname + "/../../../types/mcscriptstudiocode", plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/@mcscriptstudiocodeplugins")) Util.deleteFolderRecursive(plugindir + "/node_modules/@mcscriptstudiocodeplugins");
        fs.mkdirSync(plugindir + "/node_modules/@mcscriptstudiocodeplugins");
    };
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
    PluginManager.prototype.readyPlugin = function (plugindir, plugin, callback) {
        if (callback === void 0) {
            callback = function callback() {};
        }
        try {
            if (fs.existsSync(plugindir + "/" + plugin + "/types")) {
                var node_modules = plugindir + "/node_modules";
                if (!fs.existsSync(node_modules)) fs.mkdirSync(node_modules);
                if (!fs.existsSync(node_modules + "/@mcscriptstudiocodeplugins")) fs.mkdirSync(node_modules + "/@mcscriptstudiocodeplugins");
                var dir = node_modules + "/@mcscriptstudiocodeplugins/" + plugin;
                if (fs.existsSync(dir)) Util.deleteFolderRecursive(dir);
                fs.mkdirSync(dir);
                Util.copyFolderRecursiveSync(plugindir + "/" + plugin + "/types", dir, false);
            }
            if (!fs.existsSync(plugindir + "/" + plugin)) return;
            var options = {
                path: plugindir + "/" + plugin,
                forceInstall: false,
                npmLoad: {
                    loglevel: "silent",
                    production: "true"
                }
            };
            npmi(options, function (err) {
                if (err) {
                    if (callback) callback(err);
                    if (err.code === npmi.LOAD_ERR) console.log("npm load error");else if (err.code === npmi.INSTALL_ERR) console.log("npm install error");
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
    };
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
    PluginManager.prototype.loadPlugins = function (plugindir, callback) {
        if (callback === void 0) {
            callback = function callback() {};
        }
        var THIS = this;
        if (!fs.existsSync(plugindir)) fs.mkdirSync(plugindir);
        var plugins = this.getPlugins(plugindir);
        var x = [];
        plugins.forEach(function (e, i) {
            x[i] = false;
            THIS.readyPlugin(plugindir, e, function () {
                x[i] = true;
                var ready = true;
                x.forEach(function (b) {
                    if (!b) ready = false;
                });
                if (ready) {
                    plugins.forEach(function (e) {
                        THIS.plugins.push(THIS.loadPlugin(plugindir, e));
                    });
                    if (callback) callback();
                }
            });
        });
    };
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
    PluginManager.prototype.loadPlugin = function (plugindir, plugin) {
        if (!fs.existsSync(plugindir + "/" + plugin + "/")) throw new Error("Plugin " + plugin + " does not exists in plugindir " + plugindir);
        if (fs.existsSync(plugindir + "/" + plugin + "/types")) {
            var node_modules = plugindir + "/node_modules";
            if (!fs.existsSync(node_modules)) fs.mkdirSync(node_modules);
            if (!fs.existsSync(node_modules + "/@mcscriptstudiocodeplugins")) fs.mkdirSync(node_modules + "/@mcscriptstudiocodeplugins");
            var dir = node_modules + "/@mcscriptstudiocodeplugins/" + plugin;
            if (fs.existsSync(dir)) Util.deleteFolderRecursive(dir);
            fs.mkdirSync(dir);
            Util.copyFolderRecursiveSync(plugindir + "/" + plugin + "/types", dir, false);
        }
        var desc = this.getPluginDescription(plugindir, plugin);
        var name = desc.name,
            url = desc.url,
            author = desc.author,
            version = desc.version,
            main = desc.main,
            author_url = desc["author-url"];
        var dependencies = [];
        if (desc.pluginDependencies) {
            for (var i in desc.pluginDependencies) {
                if (!fs.existsSync(plugindir + "/" + desc.pluginDependencies[i].name)) {
                    console.log("installing plugin " + desc.pluginDependencies[i].name + ' from "' + desc.pluginDependencies[i].url + '" caused of a dependency of plugin "' + name + '"');
                    this.installPlugin(desc.pluginDependencies[i].url, plugindir);
                }
                var dependency = new Dependency_1["default"](desc.pluginDependencies[i].name, desc.pluginDependencies[i].url, plugindir, name);
                dependencies.push(dependency);
            }
        }
        if (!fs.existsSync(plugindir + "/" + plugin + "/" + main)) throw new Error("Plugin main from plugin " + plugin + " does not exists");
        var Plugin = require(plugindir + "/" + plugin + "/" + main)["default"];
        return new Plugin(name, url, author, author_url, version, main, dependencies, plugindir + "/" + plugin, this.api);
    };
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
    PluginManager.prototype.setupPlugins = function () {
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.setup();
        }
    };
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
    PluginManager.prototype.startPlugins = function () {
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.start();
        }
    };
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
    PluginManager.prototype.stopPlugins = function () {
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.stop();
        }
    };
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
    PluginManager.prototype.reloadPlugins = function () {
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.reload();
        }
    };
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
    PluginManager.prototype.getPluginDescription = function (plugindir, plugin) {
        try {
            return JSON.parse(fs.readFileSync(plugindir + "/" + plugin + "/package.json").toString());
        } catch (e) {
            console.error("Error reading plugindescription of plugin " + plugin + ": ", e);
            return {};
        }
    };
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
    PluginManager.prototype.getPlugins = function (plugindir) {
        var ret = [];
        for (var _i = 0, _a = fs.readdirSync(plugindir); _i < _a.length; _i++) {
            var i = _a[_i];
            if (fs.lstatSync(plugindir + "/" + i).isDirectory() && i.toLowerCase() != "node_modules") ret.push(i);
        }
        return ret;
    };
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
    PluginManager.prototype.fireEvent = function (event) {
        return this.api.fireEvent(event);
    };
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
    PluginManager.prototype.installPlugin = function (url, pluginfolder, callback) {
        if (callback === void 0) {
            callback = function callback() {};
        }
        var THIS = this;
        var ret = false;
        SiteAPI.loadSite(SiteAPI.parseURL(url), function (res) {
            res = JSON.parse(res);
            if (!fs.existsSync(pluginfolder + "/" + res.name)) {
                ret = true;
                var zipfile_1 = pluginfolder + "/" + res.name.toLowerCase() + ".tmp.zip";
                SiteAPI.downloadFile(zipfile_1, res.versions[res.newestversion]).then(function () {
                    extract(zipfile_1, { dir: pluginfolder + "/" + res.name.toLowerCase() }, function (err) {
                        if (err) console.error("Error installing plugin " + res.name + " from url " + url, err);else {
                            fs.unlinkSync(zipfile_1);
                            THIS.readyPlugin(pluginfolder, res.name, function () {
                                callback(null, true);
                            });
                        }
                    });
                });
            } else {
                callback(null, false);
            }
        });
        return ret;
    };
    return PluginManager;
}();
exports.PluginManager = PluginManager;
exports["default"] = PluginManager;
//# sourceMappingURL=PluginManager.js.map
