import { PluginApi, Api } from "@mcscriptstudiocode/pluginmanager";

declare class ShortcutbarAPI implements Api {
  name: string;
  version: string;
  id: string;
  server: PluginApi;

  constructor(server: PluginApi);

  addButton(id: string, name: string, icon: string, onclick: any): void;
}

export { ShortcutbarAPI };
module.exports = { ShortcutbarAPI: ShortcutbarAPI };
