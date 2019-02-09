"use strict";

exports.__esModule = true;
var mcscriptstudiocode_1 = require("mcscriptstudiocode");
var util_1 = require("./util");
var ChildProcess = require("child_process");
var start = process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open';
var standartmenu = new util_1.ContextMenu([[new util_1.ContextMenuPoint({ name: "toggle Developer-Tools", click: function click() {
        mcscriptstudiocode_1.toggleDevTools();
    } }), new util_1.ContextMenuPoint({ name: "Reload", click: function click() {
        window.location.reload();
    } })], [new util_1.ContextMenuPoint({ name: "Open GitHub Repository", click: function click() {
        ChildProcess.exec(start + ' https://github.com/miniminelp/mcscriptstudiocode');
    } }), new util_1.ContextMenuPoint({ name: "By Minimine", click: function click() {
        ChildProcess.exec(start + ' https://github.com/miniminelp');
    } })]]);
exports.standartmenu = standartmenu;
exports["default"] = standartmenu;
//# sourceMappingURL=standartmenu.js.map
