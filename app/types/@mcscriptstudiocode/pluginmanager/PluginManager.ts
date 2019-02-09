/**
 * @name PluginManager
 * @author Minimine <https://github.com/miniminelp>
 * @description this PluginManager is a part of the MCScriptStudioCode editor. It is Licensed under MIT License.
 * @license MIT
 * @copyright (c) Minimine 2018
 *
 */

declare let global;
global.srclocation = __dirname;

import PluginManager from "./pluginmanager/PluginManager";
import Api from "./pluginmanager/Api";
import PluginApi from "./pluginmanager/PluginApi";
import Plugin from "./pluginmanager/Plugin";
import Dependency from "./pluginmanager/Dependency";
import Event from "./pluginmanager/events/Event";
import CancelableEvent from "./pluginmanager/events/CancelableEvent";
import Listener from "./pluginmanager/listeners/Listener";
import OnListener from "./pluginmanager/listeners/OnListener";

// Make classes global usable
global.Plugin = Plugin;
global.Dependency = Dependency;
global.PluginApi = PluginApi;
global.PluginManager = PluginManager;
global.Event = Event;
global.OnListener = OnListener;

// Export and return on require / import
export default PluginManager;

export {
  // Standart APIs
  Plugin,
  Api,
  PluginApi,
  PluginManager,
  // Events
  Event,
  CancelableEvent,
  // Listeners
  Listener,
  OnListener,
  Dependency
};
