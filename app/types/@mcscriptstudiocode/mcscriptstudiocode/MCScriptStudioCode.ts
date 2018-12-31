declare function toggleDevTools(): void;
declare function openDevTools(): void;
declare function closeDevTools(): void;
declare let icon: string;

import * as PluginManager from "../pluginmanager";
import * as Config from "../config";

export {
  Config,
  PluginManager,
  toggleDevTools,
  openDevTools,
  closeDevTools,
  icon
};
module.exports.toggleDevTools = toggleDevTools;
module.exports.openDevTools = openDevTools;
module.exports.closeDevTools = closeDevTools;
module.exports.icon = icon;
