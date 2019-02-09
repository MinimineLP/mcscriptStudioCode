"use strict";
/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManager is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */

exports.__esModule = true;
global.srclocation = __dirname;
var PluginManager_1 = require("./pluginmanager/PluginManager");
exports.PluginManager = PluginManager_1["default"];
var PluginApi_1 = require("./pluginmanager/PluginApi");
exports.PluginApi = PluginApi_1["default"];
var Plugin_1 = require("./pluginmanager/Plugin");
exports.Plugin = Plugin_1["default"];
var Dependency_1 = require("./pluginmanager/Dependency");
exports.Dependency = Dependency_1["default"];
var OnListener_1 = require("./pluginmanager/listeners/OnListener");
exports.OnListener = OnListener_1["default"];
var Util_1 = require("./Util");
exports.guid = Util_1.guid;
// Make classes global usable
global.Plugin = Plugin_1["default"];
global.Dependency = Dependency_1["default"];
global.PluginApi = PluginApi_1["default"];
global.PluginManager = PluginManager_1["default"];
global.Event = Event;
global.OnListener = OnListener_1["default"];
global.guid = Util_1.guid;
global.deleteFolderRecursive = Util_1.deleteFolderRecursive;
global.copyFolderRecursiveSync = Util_1.copyFolderRecursiveSync;
global.copyFileSync = Util_1.copyFileSync;
// Export and return on require / import
exports["default"] = PluginManager_1["default"];
//# sourceMappingURL=PluginManager.js.map
