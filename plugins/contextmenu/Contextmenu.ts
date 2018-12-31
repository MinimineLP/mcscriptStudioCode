declare let global: any;

import * as $ from "jquery";
import standartmenu from "./scripts/Standartmenu";
import {
  ContextMenu,
  ContextMenuPoint,
  ContextMenuPointBuildingOptions
} from "./scripts/Util";
import { ServerApi, Plugin } from "@mcscriptstudiocode/pluginmanager";

var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
  currentMousePos.x = event.clientX;
  currentMousePos.y = event.clientY;
});

export default class Contextmenu extends Plugin {
  server: ServerApi;

  setup(server: ServerApi) {
    this.server = server;

    server.addStylesheet(`${__dirname}/css/contextmenu.min.css`);
    let api = new ContextMenuAPI(server);
    server.registerAPI("contextmenu", api);
  }

  start(server: ServerApi) {
    this.server = server;
  }

  stop(server: ServerApi) {
    this.server = server;
  }

  reload(server: ServerApi) {
    this.server = server;
  }
}

class ContextMenuAPI {
  id: string = "contextmenu";
  server: ServerApi;
  standartmenu: ContextMenu = standartmenu;

  constructor(server: ServerApi) {
    this.server = server;
    let THIS = this;
    server.addElement(`<div id="${this.id}" style="display:none"></div>`);
    $(document).click(function() {
      THIS.hide();
    });
    $(document).mousedown(function(event) {
      if (event.which != 1) THIS.hide();
    });
  }

  show(menu: ContextMenu) {
    $(`#${this.id}`).empty();
    $(`#${this.id}`).append(menu.render());
    $(`#${this.id}`).show();
    $(`#${this.id}`).css({ top: currentMousePos.y, left: currentMousePos.x });
  }

  hide() {
    $(`#${this.id}`).empty();
    $(`#${this.id}`).hide();
  }
}

global.ContextMenu = ContextMenu;
global.ContextMenuAPI = ContextMenuAPI;
global.ContextMenuPoint = ContextMenuPoint;
global.ContextMenuPointBuildingOptions = ContextMenuPointBuildingOptions;
