import * as $ from "jquery";
import { ServerApi , Plugin } from '@mcscriptstudiocode/pluginmanager';

declare let global:any;

export default class Shortcutbar extends Plugin {

  server:ServerApi;

  setup(server:ServerApi){
    this.server = server;

    server.addStylesheet(`${__dirname}/css/shortcutbar.min.css`);
    let api = new ShortcutbarAPI(server);
    server.registerAPI("shortcutbar", api);

  }

  start(server:ServerApi){
    this.server = server;
  }

  stop(server:ServerApi){
    this.server = server;
  }

  reload(server:ServerApi) {
    this.server = server;
  }
}

class ShortcutbarAPI {

  id:string = "shortcutbar"
  server: ServerApi;

  constructor(server:ServerApi){
    this.server = server;
    server.addElement(`<div id="shortcutbar"></div>`);
  }

  addButton(id:string,name:string,icon:string,onclick:any) {
    $(`#${this.id}`).append(`<button id="${id}" class="shortcutbarbutton" tooltip="${name}">${icon}</button>`)//<i class="mdi mdi-play" />
    if(onclick!=null)$(`#${id}`).click(onclick);
  }

}

global.ShortcutbarAPI = ShortcutbarAPI;
