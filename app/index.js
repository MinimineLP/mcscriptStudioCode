"use strict";
exports.__esModule = true;
var fs = require("fs");
var PluginManager_1 = require("./src/scripts/PluginManager");
var SiteAPI = require("./src/scripts/SiteApi");
var Preloader = require("./src/scripts/Preloader");
var Config_1 = require("./src/scripts/Config");
var electron = require("electron");
global.toggleDevTools = function () {
    electron.ipcRenderer.send("devtools", "toggle");
};
global.openDevTools = function () {
    electron.ipcRenderer.send("devtools", "open");
};
global.closeDevTools = function () {
    electron.ipcRenderer.send("devtools", "close");
};
var config = new Config_1.Config("config.yml", "yaml");
document.write("<!DOCTYPE html><html lang=\"en\" dir=\"ltr\"><head><meta charset=\"utf-8\"><title>MCScript Studio Code</title></head><body></body></html>\"");
global.working_dir = electron.ipcRenderer.sendSync("get_folder", "get_folder")[0];
global.icon = electron.ipcRenderer.sendSync("get_icon", "get_icon");
window.alert = function (content) {
    return electron.ipcRenderer.sendSync("alert", content.toString());
};
window.prompt = function (title, val) {
    return electron.ipcRenderer.sendSync("prompt", { title: title, val: val });
};
var appdata = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');
var datafolder = appdata + "/mcscriptStudioCode";
if (!fs.existsSync(datafolder + "/plugins"))
    fs.mkdirSync(datafolder + "/plugins");
if (!fs.existsSync(datafolder))
    fs.mkdirSync(datafolder);
var manager = new PluginManager_1.PluginManager();
Preloader.start();
console.log("installing plugins...");
SiteAPI.loadSite({ host: "raw.githubusercontent.com", path: '/MinimineLP/mcscriptStudioCode/master/plugins/core-plugins.json', protocoll: 'https' }, function (ret) {
    console.log(ret);
    for (var _i = 0, _a = JSON.parse(ret); _i < _a.length; _i++) {
        var url = _a[_i];
        manager.installPlugin(url, datafolder + "/plugins");
    }
});
manager.loadPlugins(datafolder + "/plugins", function () {
    var MenuActionAPI = /** @class */ (function () {
        function MenuActionAPI() {
            this.listeners = {};
        }
        MenuActionAPI.prototype.on = function (key, func) {
            if (!this.listeners[key])
                this.listeners[key] = [];
            this.listeners[key].push(func);
        };
        MenuActionAPI.prototype.trigger = function (key) {
            if (this.listeners[key])
                this.listeners[key].forEach(function (func) {
                    func();
                });
        };
        return MenuActionAPI;
    }());
    electron.ipcRenderer.on("menu_action", function (x, arg) {
        var menuactionapi = manager.api.getAPI("menu_action");
        menuactionapi.trigger(arg);
    });
    manager.api.addStylesheet(__dirname + "/src/css/style.min.css");
    manager.api.registerAPI("menu_action", new MenuActionAPI());
    manager.setupPlugins();
    manager.startPlugins();
    window.addEventListener("unload", function () {
        manager.stopPlugins();
    });
    setTimeout(function () {
        Preloader.hide();
    }, 500);
});
