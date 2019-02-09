declare let global: any;

import * as $ from "jquery";
import standartmenu from "./scripts/Standartmenu";
import {
  ContextMenu,
  ContextMenuPoint,
  ContextMenuPointBuildingOptions
} from "./scripts/Util";
import { Plugin, PluginApi, Api } from "@mcscriptstudiocode/pluginmanager";

var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function(event) {
  currentMousePos.x = event.clientX;
  currentMousePos.y = event.clientY;
});

/**
 * @class Contextmenu
 * @package MCScriptStudioCode Plugin api for Contextmenus
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.1
 * @version 0.0.1
 *
 * @desc ContextMenu Plugin for mcscriptstudiocode
 *
 */
export default class Contextmenu extends Plugin {
  static instance: Plugin;

  /**
   * @function setup
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc The setup function is called for the setup
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  setup() {
    Contextmenu.instance = this;

    this.api.addStylesheet(`${__dirname}/style/css/global.min.css`);
    let api = new ContextMenuAPI(this.api);
    this.api.registerAPI("contextmenu", api);
  }

  /**
   * @function start
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the start function starts the plugins. Here you can manipulate elements etc...
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  start() {}

  /**
   * @function stop
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the stop function is called for program stop. this does not work always for now
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  stop() {}

  /**
   * @function reload
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc the reload function is called on program stop. this does not work always for now
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  reload() {}
}

/**
 * @class ContextMenuAPI
 * @package Contextmenu
 * @author Minimine <https://github.com/miniminelp>
 * @since 0.0.1
 * @version 0.0.1
 *
 * @desc the api for other plugins
 *
 */
class ContextMenuAPI implements Api {

  name: string = "contextmenu";
  version:string = "0.0.1";
  id: string = "contextmenu";
  api: PluginApi;
  standartmenu: ContextMenu = standartmenu;

  /**
   * @function constructor
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc constructor for ContextMenuAPI
   * @arg server:ServerApi the ServerApi gives usefull functions for the plugins
   *
   */
  constructor(api: PluginApi) {
    this.api = api;
    let THIS = this;
    api.addElement(`<div id="${this.id}" style="display:none"></div>`);
    $(document).click(function() {
      THIS.hide();
    });
    $(document).mousedown(function(event) {
      if (event.which != 1) THIS.hide();
    });
  }

  /**
   * @function show
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc Shows a contextmenu
   * @arg menu:ContextMenu the menu to show
   *
   */
  show(menu: ContextMenu) {
    $(`#${this.id}`).empty();
    $(`#${this.id}`).append(menu.render());
    $(`#${this.id}`).show();
    $(`#${this.id}`).css({ top: currentMousePos.y, left: currentMousePos.x });
  }

  /**
   * @function hide
   * @package Contextmenu
   * @author Minimine <https://github.com/miniminelp>
   * @since 0.0.1
   * @version 0.0.1
   *
   * @desc Hides the contextmenu
   *
   */
  hide() {
    $(`#${this.id}`).empty();
    $(`#${this.id}`).hide();
  }
}

global.ContextMenu = ContextMenu;
global.ContextMenuAPI = ContextMenuAPI;
global.ContextMenuPoint = ContextMenuPoint;
global.ContextMenuPointBuildingOptions = ContextMenuPointBuildingOptions;
