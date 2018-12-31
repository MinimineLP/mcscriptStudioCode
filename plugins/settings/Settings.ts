import { ShortcutbarAPI } from "@mcscriptstudiocodeplugins/shortcutbar";
import { settingsapi, SettingsAPI } from "./scripts/SettingsAPI";
import { ServerApi, Plugin } from "@mcscriptstudiocode/pluginmanager";

declare let global: any;

export let instance: Settings;
export default class Settings extends Plugin {
  server: ServerApi;

  setup(server: ServerApi) {
    instance = this;
    this.server = server;
    server.addElement(
      `<div id="settings" style="display:none"><h3>Settings</h3></div>`
    );
    server.addStylesheet(`${__dirname}/css/settings.min.css`);
    server.registerAPI("settings", settingsapi);
    settingsapi.loadFrame();
  }

  start(server: ServerApi) {
    let api: ShortcutbarAPI = server.getAPI("shortcutbar");
    api.addButton(
      "open_settings",
      "open settings",
      `<i class="mdi mdi-settings"></i>`,
      function() {
        settingsapi.show();
      }
    );
    this.server = server;
  }

  stop(server: ServerApi) {
    this.server = server;
  }

  reload(server: ServerApi) {
    this.server = server;
  }
}

global.settingsapi = settingsapi;
global.SettingsAPI = SettingsAPI;
