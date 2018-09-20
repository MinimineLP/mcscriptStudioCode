"use strict";
/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManage is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var fs = require("fs");
var SiteAPI = require("./siteapi");
var extract = require("extract-zip");
/**
 *
 */
global.srclocation = __dirname;
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
var PluginManager = /** @class */ (function () {
    /**
     * @function constructor
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
     *
     * @description Constructor for Class PluginManager
     * @param plugindir the dir where the plugins are
     *
     */
    function PluginManager() {
        this.plugins = [];
        this.api = new ServerApi();
    }
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
    PluginManager.prototype.loadPlugins = function (plugindir) {
        if (!fs.existsSync(plugindir))
            fs.mkdirSync(plugindir);
        for (var _i = 0, _a = this.getPlugins(plugindir); _i < _a.length; _i++) {
            var i = _a[_i];
            this.plugins.push(this.loadPlugin(plugindir, i));
        }
    };
    /**
     * @function loadPlugin
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
     *
     * @description Loads a Plugin
     * @param plugin the Plugin to load
     * @return the plugin main file default class
     *
     */
    PluginManager.prototype.loadPlugin = function (plugindir, plugin) {
        var _a = this.getPluginDescription(plugindir, plugin), name = _a.name, url = _a.url, author = _a.author, author_url = _a.author_url, version = _a.version, main = _a.main;
        var Plugin = require(plugindir + "/" + plugin + "/" + main)["default"];
        return new Plugin(name, url, author, author_url, version, main);
    };
    /**
     * @function setupPlugins
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
     *
     * @description setups the plugins
     *
     */
    PluginManager.prototype.setupPlugins = function () {
        this.api.addFile(__dirname + "/../jquery/jquery.js");
        this.api.addScript(__dirname + "/../jquery/jquery.min.js");
        this.api.addFile(__dirname + "/../jquery/jquery.min.js.map");
        this.api.addScript(__dirname + "/htdocs/scripts/prototypes-min.js");
        this.api.addScript(__dirname + "/htdocs/scripts/ajax-min.js");
        this.api.addScript(__dirname + "/htdocs/scripts/setupWindow-min.js");
        this.api.addStylesheet(__dirname + "/htdocs/style/style.min.css");
        for (var _i = 0, _a = this.plugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            plugin.setup(this.api);
        }
        this.api.registerListener(new OnRequest(this.api));
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
     * @return the plugin.json content
     *
     */
    PluginManager.prototype.getPluginDescription = function (plugindir, plugin) {
        return JSON.parse(fs.readFileSync(plugindir + "/" + plugin + "/plugin.json").toString());
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
            if (fs.lstatSync(plugindir + "/" + i).isDirectory())
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
     * @version 0.0.2
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
                var zipfile_1 = pluginfolder + "/" + res.name + ".tmp.zip";
                SiteAPI.downloadFile(zipfile_1, res.versions[res.newestversion], function () {
                    extract(zipfile_1, { dir: pluginfolder + "/" + res.name }, function (err) {
                        if (err)
                            console.log(err);
                        else {
                            var plugin = THIS.loadPlugin(pluginfolder, res.name);
                            plugin.setup(THIS.api);
                            plugin.start(THIS.api);
                            THIS.plugins.push(plugin);
                            fs.unlinkSync(zipfile_1);
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
    function ServerApi() {
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
         * @var scripts
         * @author Minimine <https://github.com/miniminelp>
         * @since 0.0.2
         * @version 0.0.2
         * @license MIT
         * @copyright (c) Minimine 2018
         *
         * @description Contains the scripts
         *
         */
        this.scripts = {};
        /**
         * @var stylesheets
         * @author Minimine <https://github.com/miniminelp>
         * @since 0.0.2
         * @version 0.0.2
         * @license MIT
         * @copyright (c) Minimine 2018
         *
         * @description Contains the stylesheets
         *
         */
        this.stylesheets = {};
        /**
         * @var files
         * @author Minimine <https://github.com/miniminelp>
         * @since 0.0.2
         * @version 0.0.2
         * @license MIT
         * @copyright (c) Minimine 2018
         *
         * @description Contains the files
         *
         */
        this.files = {};
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
     * @function addScript
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
  
     * @description register a script
     * @param src the script source
     */
    ServerApi.prototype.addScript = function (src, id) {
        if (id === void 0) { id = "/" + guid() + ".js"; }
        this.scripts[id] = src;
        return id;
    };
    /**
     * @function addStylesheet
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
  
     * @description register a stylesheet
     * @param src the stylesheet source
     */
    ServerApi.prototype.addStylesheet = function (src, id) {
        if (id === void 0) { id = "/" + guid() + ".css"; }
        this.stylesheets[id] = src;
        return id;
    };
    /**
     * @function addFile
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
  
     * @description register a stylesheet
     * @param src the file source
     */
    ServerApi.prototype.addFile = function (src, id) {
        if (id === void 0) { id = null; }
        if (id == null)
            id = "/" + guid() + "." + src.split(".")[src.split(".").length - 1];
        this.files[id] = src;
        return id;
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
     * @function registerAPI
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
  
     * @description register a api
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
     * @version 0.0.2
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
    function Plugin(name, url, author, author_url, version, main) {
        this.name = name;
        this.url = url;
        this.author = author;
        this.author_url = author_url;
        this.version = version;
        this.main = main;
    }
    return Plugin;
}());
exports.Plugin = Plugin;
/**
 * @class RequestEvent
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @implements CancelableEvent
 */
var RequestEvent = /** @class */ (function () {
    /**
     * @function constructor
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
     *
     * @description The Constructor for the RequestEvent
     * @param request the request
     * @param response the response
     *
     */
    function RequestEvent(request, response) {
        /**
         * @see CancelableEvent#canceled
         *
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
        this.canceled = false;
        this.request = request;
        this.response = response;
    }
    /**
     * @see Event#getType
     *
     * @function getType
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.2
     * @license MIT
     * @copyright (c) Minimine 2018
     *
     * @description cancels the Event (or the default reaction)
     * @return the type
     *
     */
    RequestEvent.prototype.getType = function () {
        return "request";
    };
    /**
     * @see CancelableEvent#cancel
     *
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
    RequestEvent.prototype.cancel = function () {
        this.canceled = true;
    };
    return RequestEvent;
}());
exports.RequestEvent = RequestEvent;
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
     * @function get Type
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
 * @class ServerApi
 * @implements Listener
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.2
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 * @description Listening for requsts
 * @abstract
 *
 */
var RequestListener = /** @class */ (function () {
    function RequestListener() {
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
     * @description the function will be run when the Event appears
     * @return the type
     * @abstract
     *
     */
    RequestListener.prototype.getType = function () {
        return "request";
    };
    return RequestListener;
}());
exports.RequestListener = RequestListener;
/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Functions
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */
// guid: returns a uuid
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Static
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */
var contenttypes = JSON.parse(fs.readFileSync(__dirname + "/contenttypes.json").toString());
var OnRequest = /** @class */ (function (_super) {
    __extends(OnRequest, _super);
    function OnRequest(api) {
        var _this = _super.call(this) || this;
        _this.api = api;
        return _this;
    }
    OnRequest.prototype.run = function (event) {
        var url = event.request.url;
        if (url.charAt(url.length - 1) == "/")
            url += "index.html";
        if (url == "/index.html") {
            var add = "";
            for (var k in this.api.scripts) {
                add += "<script src=\"" + k + "\"></script>";
            }
            for (var k in this.api.stylesheets) {
                add += "<link type=\"text/css\" rel=\"stylesheet\" href=\"" + k + "\">";
            }
            event.response.writeHead(200, { 'Content-Type': "text/html" });
            event.response.end(fs.readFileSync(__dirname + "/htdocs/index.html").toString().replace(/%scriptplaceholder%/g, add));
            event.cancel();
        }
        for (var s in this.api.scripts) {
            if (event.request.url == s) {
                event.response.writeHead(200, { 'Content-Type': "text/javascript" });
                event.response.end(fs.readFileSync(this.api.scripts[s]));
                event.cancel();
            }
        }
        for (var s in this.api.stylesheets) {
            if (event.request.url == s) {
                event.response.writeHead(200, { 'Content-Type': "text/css" });
                event.response.end(fs.readFileSync(this.api.stylesheets[s]));
                event.cancel();
            }
        }
        for (var s in this.api.files) {
            if (event.request.url == s) {
                var file = this.api.files[s];
                var ending = file.split(".")[file.split(".").length - 1];
                var contenttype = "text/html";
                if (contenttypes[ending])
                    contenttype = contenttypes[ending];
                event.response.writeHead(200, { 'Content-Type': contenttype });
                event.response.end(fs.readFileSync(this.api.files[s]));
                event.cancel();
            }
        }
    };
    return OnRequest;
}(RequestListener));
/*
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 Exports
 **********************************************************************************************************************************
 **********************************************************************************************************************************
 */
exports["default"] = PluginManager;
