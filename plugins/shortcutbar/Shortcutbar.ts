import * as $ from "jquery";
import { Plugin, PluginApi, Api } from "@mcscriptstudiocode/pluginmanager";

declare let global: any;

export default class Shortcutbar extends Plugin {
  setup() {
    this.api.addStylesheet(`${__dirname}/style/css/shortcutbar.min.css`);
    let api = new ShortcutbarAPI(this.api);
    this.api.registerAPI("shortcutbar", api);
  }

  start() {}

  stop() {}

  reload() {}
}

class ShortcutbarAPI implements Api {
  readonly name: string = "Shortcutbar";
  readonly version: string = "0.0.1";
  id: string = "shortcutbar";

  constructor(api: PluginApi) {
    api.addElement(`<div id="shortcutbar"></div>`);
  }

  addButton(id: string, name: string, icon: string, onclick: any) {
    $(`#${this.id}`).append(
      `<button id="${id}" class="shortcutbarbutton" tooltip="${name}">${icon}</button>`
    ); //<i class="mdi mdi-play" />
    if (onclick != null) $(`#${id}`).click(onclick);
  }
}

global.ShortcutbarAPI = ShortcutbarAPI;
