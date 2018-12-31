"use strict";
/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManager is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var Path = require("path");
var extract = require("extract-zip");
var $ = require("jquery");
var npmi = require("npmi");
var SiteAPI = require("./SiteApi");
var manager;
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
var PluginManager = /** @class */ (function () {
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
    PluginManager.prototype.readyPluginDir = function (plugindir) {
        if (!fs.existsSync(plugindir + "/node_modules"))
            fs.mkdirSync(plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/@mcscriptstudiocode"))
            deleteFolderRecursive(plugindir + "/node_modules/@mcscriptstudiocode");
        copyFolderRecursiveSync("types/@mcscriptstudiocode", plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/mcscriptstudiocode"))
            deleteFolderRecursive(plugindir + "/node_modules/mcscriptstudiocode");
        copyFolderRecursiveSync("types/mcscriptstudiocode", plugindir + "/node_modules");
        if (fs.existsSync(plugindir + "/node_modules/@mcscriptstudiocodeplugins"))
            deleteFolderRecursive(plugindir + "/node_modules/@mcscriptstudiocodeplugins");
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
        if (callback === void 0) { callback = function () { }; }
        return __awaiter(this, void 0, void 0, function () {
            var node_modules, dir, options;
            return __generator(this, function (_a) {
                try {
                    if (fs.existsSync(plugindir + "/" + plugin + "/types")) {
                        node_modules = plugindir + "/node_modules";
                        if (!fs.existsSync(node_modules))
                            fs.mkdirSync(node_modules);
                        if (!fs.existsSync(node_modules + "/@mcscriptstudiocodeplugins"))
                            fs.mkdirSync(node_modules + "/@mcscriptstudiocodeplugins");
                        dir = node_modules + "/@mcscriptstudiocodeplugins/" + plugin;
                        if (fs.existsSync(dir))
                            deleteFolderRecursive(dir);
                        fs.mkdirSync(dir);
                        copyFolderRecursiveSync(plugindir + "/" + plugin + "/types", dir, false);
                    }
                    if (!fs.existsSync(plugindir + "/" + plugin))
                        return [2 /*return*/];
                    options = {
                        path: plugindir + "/" + plugin,
                        forceInstall: false,
                        npmLoad: {
                            loglevel: "silent",
                            production: "true"
                        }
                    };
                    npmi(options, function (err) {
                        if (err) {
                            if (callback)
                                callback(err);
                            if (err.code === npmi.LOAD_ERR)
                                console.log("npm load error");
                            else if (err.code === npmi.INSTALL_ERR)
                                console.log("npm install error");
                            return console.log(err.message);
                        }
                        if (callback)
                            callback();
                        // installed
                        // console.log("Installed dependencies successfully in " + Path.resolve(options.path));
                    });
                }
                catch (e) {
                    callback(e);
                    e.printStackTrace();
                }
                return [2 /*return*/];
            });
        });
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
        if (callback === void 0) { callback = function () { }; }
        var THIS = this;
        THIS.readyPluginDir(plugindir);
        if (!fs.existsSync(plugindir))
            fs.mkdirSync(plugindir);
        var plugins = this.getPlugins(plugindir);
        var x = [];
        plugins.forEach(function (e, i) {
            x[i] = false;
            THIS.readyPlugin(plugindir, e, function () {
                x[i] = true;
                var ready = true;
                x.forEach(function (b) {
                    if (!b)
                        ready = false;
                });
                if (ready) {
                    plugins.forEach(function (e) {
                        THIS.plugins.push(THIS.loadPlugin(plugindir, e));
                    });
                    if (callback)
                        callback();
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
        if (!fs.existsSync(plugindir + "/" + plugin + "/"))
            throw new Error("Plugin " + plugin + " does not exists in plugindir " + plugindir);
        if (fs.existsSync(plugindir + "/" + plugin + "/types")) {
            var node_modules = plugindir + "/node_modules";
            if (!fs.existsSync(node_modules))
                fs.mkdirSync(node_modules);
            if (!fs.existsSync(node_modules + "/@mcscriptstudiocodeplugins"))
                fs.mkdirSync(node_modules + "/@mcscriptstudiocodeplugins");
            var dir = node_modules + "/@mcscriptstudiocodeplugins/" + plugin;
            if (fs.existsSync(dir))
                deleteFolderRecursive(dir);
            fs.mkdirSync(dir);
            copyFolderRecursiveSync(plugindir + "/" + plugin + "/types", dir, false);
        }
        var desc = this.getPluginDescription(plugindir, plugin);
        var name = desc.name, url = desc.url, author = desc.author, author_url = desc.author_url, version = desc.version, main = desc.main;
        var dependencies = [];
        if (desc.pluginDependencies) {
            for (var i in desc.pluginDependencies) {
                if (!fs.existsSync(plugindir + "/" + desc.pluginDependencies[i].name)) {
                    console.log("installing plugin " +
                        desc.pluginDependencies[i].name +
                        ' from "' +
                        desc.pluginDependencies[i].url +
                        '" caused of a dependency of plugin "' +
                        name +
                        '"');
                    this.installPlugin(desc.pluginDependencies[i].url, plugindir);
                }
                var dependency = new Dependency(desc.pluginDependencies[i].name, desc.pluginDependencies[i].url, plugindir, name);
                dependencies.push(dependency);
            }
        }
        if (!fs.existsSync(plugindir + "/" + plugin + "/" + main))
            throw new Error("Plugin main from plugin " + plugin + " does not exists");
        var Plugin = require(plugindir + "/" + plugin + "/" + main)["default"];
        return new Plugin(name, url, author, author_url, version, main, dependencies, plugindir + "/" + plugin);
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
            plugin.setup(this.api);
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
            plugin.start(this.api);
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
            plugin.stop(this.api);
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
            plugin.reload(this.api);
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
        }
        catch (e) {
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
            if (fs.lstatSync(plugindir + "/" + i).isDirectory() &&
                i.toLowerCase() != "node_modules")
                ret.push(i);
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
    PluginManager.prototype.installPlugin = function (url, pluginfolder) {
        var THIS = this;
        SiteAPI.loadSite(SiteAPI.parseURL(url), function (res) {
            res = JSON.parse(res);
            if (!fs.existsSync(pluginfolder + "/" + res.name)) {
                var zipfile_1 = pluginfolder + "/" + res.name.toLowerCase() + ".tmp.zip";
                SiteAPI.downloadFile(zipfile_1, res.versions[res.newestversion], function () {
                    extract(zipfile_1, { dir: pluginfolder + "/" + res.name.toLowerCase() }, function (err) {
                        if (err)
                            console.error("Error installing plugin " + res.name + " from url " + url, err);
                        else {
                            fs.unlinkSync(zipfile_1);
                            THIS.readyPlugin(pluginfolder, res.name);
                        }
                    });
                });
            }
        });
    };
    return PluginManager;
}());
exports.PluginManager = PluginManager;
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
var ServerApi = /** @class */ (function () {
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
    function ServerApi(manager) {
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
        this.listeners = [];
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
        this.apis = {};
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
    ServerApi.prototype.on = function (event, func) {
        this.registerListener(new OnListener(event, func));
    };
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
    ServerApi.prototype.registerListener = function (listener) {
        this.listeners.push(listener);
    };
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
    ServerApi.prototype.fireEvent = function (event) {
        var type = event.getType();
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            if (listener.getType() == type) {
                listener.run(event);
            }
        }
        return event;
    };
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
    ServerApi.prototype.addStylesheet = function (stylesheet) {
        if (!document.getElementById(stylesheet)) {
            var head = document.getElementsByTagName("head")[0];
            var link = document.createElement("link");
            link.id = stylesheet;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = stylesheet;
            link.media = "all";
            head.appendChild(link);
        }
    };
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
    ServerApi.prototype.addScript = function (script) {
        console.warn("Please use require(yourscript) instead of the deprecated method ServerApi#addScript()");
        //console.log(`Loaded script from "${script}"`);
        if (!document.getElementById(script)) {
            var head = document.getElementsByTagName("head")[0];
            var link = document.createElement("script");
            link.id = script;
            link.type = "text/javascript";
            link.src = script;
            head.appendChild(link);
        }
    };
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
    ServerApi.prototype.addElement = function (element) {
        if (element instanceof HTMLElement)
            document.body.appendChild(element);
        else
            $("body").append(element);
    };
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
    ServerApi.prototype.registerAPI = function (key, api) {
        this.apis[key] = api;
    };
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
    ServerApi.prototype.getAPI = function (key) {
        return this.apis[key];
    };
    return ServerApi;
}());
exports.ServerApi = ServerApi;
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
var Plugin = /** @class */ (function () {
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
    function Plugin(name, url, author, author_url, version, main, dependencies, path) {
        this.name = name;
        this.url = url;
        this.author = author;
        this.author_url = author_url;
        this.version = version;
        this.main = main;
        this.dependencies = dependencies;
        this.path = path;
    }
    return Plugin;
}());
exports.Plugin = Plugin;
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
var Dependency = /** @class */ (function () {
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
    function Dependency(name, url, plugindir, requiredBy) {
        this.name = name;
        this.url = url;
        if (!fs.existsSync(plugindir + "/" + name + "/"))
            manager.installPlugin(url, plugindir);
        if (fs.existsSync(plugindir + "/" + name + "/"))
            this.plugin = manager.loadPlugin(plugindir, name);
        else
            throw new Error("The dependency " + name + " in " + requiredBy + " has an wrong import!");
    }
    return Dependency;
}());
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
var OnListener = /** @class */ (function () {
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
}());
exports.OnListener = OnListener;
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
    return (s4() +
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
        s4());
}
exports.guid = guid;
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
function copyFolderRecursiveSync(source, target, useOldName) {
    if (useOldName === void 0) { useOldName = true; }
    var files = [];
    var targetFolder = target;
    if (useOldName)
        targetFolder = Path.join(target, Path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = Path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            }
            else {
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
function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            }
            else {
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
exports["default"] = PluginManager;
