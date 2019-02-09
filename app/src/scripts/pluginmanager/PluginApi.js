"use strict";

exports.__esModule = true;
var OnListener_1 = require("./listeners/OnListener");
/**
 * @class PluginApi
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.2
 * @version 0.0.3
 * @license MIT
 * @copyright (c) Minimine 2018 - 2019
 *
 * @description The Api to manage the server
 *
 */
var PluginApi = /** @class */function () {
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
    function PluginApi(manager) {
        /**
         * @var name
         * @author Minimine <https://github.com/miniminelp>
         * @since 0.0.3
         * @version 0.0.3
         * @license MIT
         * @copyright (c) Minimine 2019
         *
         * @description the name
         *
         */
        this.name = "0.0.3";
        /**
         * @var version
         * @author Minimine <https://github.com/miniminelp>
         * @since 0.0.3
         * @version 0.0.3
         * @license MIT
         * @copyright (c) Minimine 2019
         *
         * @description the version
         *
         */
        this.version = "0.0.3";
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
         * @version 0.0.3
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
    PluginApi.prototype.on = function (event, func) {
        this.registerListener(new OnListener_1["default"](event, func));
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
    PluginApi.prototype.registerListener = function (listener) {
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
    PluginApi.prototype.fireEvent = function (event) {
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
    PluginApi.prototype.addStylesheet = function (stylesheet) {
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
    PluginApi.prototype.addScript = function (script) {
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
    PluginApi.prototype.addElement = function (element) {
        if (element instanceof HTMLElement) document.body.appendChild(element);else $("body").append(element);
    };
    /**
     * @function registerAPI
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.3
     * @license MIT
     * @copyright (c) Minimine 2018
         * @description register a api
     * @param key the api key
     * @param api the api
     */
    PluginApi.prototype.registerAPI = function (key, api) {
        this.apis[key] = api;
    };
    /**
     * @function getAPI
     * @author Minimine <https://github.com/miniminelp>
     * @since 0.0.2
     * @version 0.0.3
     * @license MIT
     * @copyright (c) Minimine 2018
         * @description get a api
     * @param key the api key
     * @return the api
     */
    PluginApi.prototype.getAPI = function (key) {
        return this.apis[key];
    };
    return PluginApi;
}();
exports.PluginApi = PluginApi;
exports["default"] = PluginApi;
//# sourceMappingURL=PluginApi.js.map
