"use strict";

var __extends = undefined && undefined.__extends || function () {
    var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) {
                if (b.hasOwnProperty(p)) d[p] = b[p];
            }
        };
        return _extendStatics(d, b);
    };
    return function (d, b) {
        _extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
exports.__esModule = true;
var $ = require("jquery");
var Standartmenu_1 = require("./scripts/Standartmenu");
var Util_1 = require("./scripts/Util");
var pluginmanager_1 = require("@mcscriptstudiocode/pluginmanager");
var currentMousePos = { x: -1, y: -1 };
$(document).mousemove(function (event) {
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
var Contextmenu = /** @class */function (_super) {
    __extends(Contextmenu, _super);
    function Contextmenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    Contextmenu.prototype.setup = function () {
        Contextmenu.instance = this;
        this.api.addStylesheet(__dirname + "/style/css/global.min.css");
        var api = new ContextMenuAPI(this.api);
        this.api.registerAPI("contextmenu", api);
    };
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
    Contextmenu.prototype.start = function () {};
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
    Contextmenu.prototype.stop = function () {};
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
    Contextmenu.prototype.reload = function () {};
    return Contextmenu;
}(pluginmanager_1.Plugin);
exports["default"] = Contextmenu;
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
var ContextMenuAPI = /** @class */function () {
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
    function ContextMenuAPI(api) {
        this.name = "contextmenu";
        this.version = "0.0.1";
        this.id = "contextmenu";
        this.standartmenu = Standartmenu_1["default"];
        this.api = api;
        var THIS = this;
        api.addElement("<div id=\"" + this.id + "\" style=\"display:none\"></div>");
        $(document).click(function () {
            THIS.hide();
        });
        $(document).mousedown(function (event) {
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
    ContextMenuAPI.prototype.show = function (menu) {
        $("#" + this.id).empty();
        $("#" + this.id).append(menu.render());
        $("#" + this.id).show();
        $("#" + this.id).css({ top: currentMousePos.y, left: currentMousePos.x });
    };
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
    ContextMenuAPI.prototype.hide = function () {
        $("#" + this.id).empty();
        $("#" + this.id).hide();
    };
    return ContextMenuAPI;
}();
global.ContextMenu = Util_1.ContextMenu;
global.ContextMenuAPI = ContextMenuAPI;
global.ContextMenuPoint = Util_1.ContextMenuPoint;
global.ContextMenuPointBuildingOptions = Util_1.ContextMenuPointBuildingOptions;
//# sourceMappingURL=Contextmenu.js.map
