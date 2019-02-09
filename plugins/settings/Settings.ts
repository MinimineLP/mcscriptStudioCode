import { ShortcutbarAPI } from "@mcscriptstudiocodeplugins/shortcutbar";
import { settingsapi, SettingsAPI } from "./scripts/SettingsAPI";
import { Plugin } from "@mcscriptstudiocode/pluginmanager";

declare let global: any;

export let instance: Settings;
export default class Settings extends Plugin {
  setup() {
    instance = this;
    this.api.addElement(
      `<div id="settings" style="display:none"><h3>Settings</h3></div>`
    );
    this.api.addStylesheet(`${__dirname}/style/css/global.min.css`);
    this.api.registerAPI("settings", settingsapi);
    settingsapi.loadFrame();
  }

  start() {
    let api: ShortcutbarAPI = this.api.getAPI("shortcutbar");
    api.addButton(
      "open_settings",
      "open settings",
      `<i class="mdi mdi-settings"></i>`,
      function() {
        settingsapi.show();
      }
    );
  }

  stop() {}

  reload() {}
}

global.settingsapi = settingsapi;
global.SettingsAPI = SettingsAPI;
