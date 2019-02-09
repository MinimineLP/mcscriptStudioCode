"use strict";

exports.__esModule = true;
var fs = require("fs");
var PluginManager_1 = require("./PluginManager");
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
var Dependency = /** @class */function () {
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
        if (!fs.existsSync(plugindir + "/" + name + "/")) PluginManager_1.PluginManager.instance.installPlugin(url, plugindir);
        if (fs.existsSync(plugindir + "/" + name + "/")) this.plugin = PluginManager_1.PluginManager.instance.loadPlugin(plugindir, name);else throw new Error("The dependency " + name + " in " + requiredBy + " has an wrong import!");
    }
    return Dependency;
}();
exports.Dependency = Dependency;
exports["default"] = Dependency;
//# sourceMappingURL=Dependency.js.map
