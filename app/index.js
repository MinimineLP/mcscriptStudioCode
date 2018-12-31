"use strict";
exports.__esModule = true;
var fs = require("fs");
var PluginManager_1 = require("./src/scripts/PluginManager");
var SiteAPI = require("./src/scripts/SiteApi");
var electron = require("electron");
var node_console = require("console");
document.write("<!DOCTYPE html><html lang=\"en\" dir=\"ltr\"><head><meta charset=\"utf-8\"><title>MCScript Studio Code</title></head><body></body></html>\"");
global.working_dir = electron.ipcRenderer.sendSync("get_folder", "get_folder")[0];
window.alert = function (content) {
    return electron.ipcRenderer.sendSync("alert", content.toString());
};
window.prompt = function (title, val) {
    return electron.ipcRenderer.sendSync("prompt", { title: title, val: val });
};
var datafolder = (process.env.APPDATA ||
    (process.platform == "darwin"
        ? process.env.HOME + "Library/Preferences"
        : "/var/local")) + "/mcscriptStudioCode";
if (!fs.existsSync(datafolder))
    fs.mkdirSync(datafolder);
var manager = new PluginManager_1.PluginManager();
console.log(datafolder + "/plugins");
manager.loadPlugins(datafolder + "/plugins");
SiteAPI.loadSite({
    host: "raw.githubusercontent.com",
    path: "/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json",
    protocoll: "https"
}, function (ret) {
    for (var _i = 0, _a = JSON.parse(ret); _i < _a.length; _i++) {
        var url = _a[_i];
        manager.installPlugin(url, datafolder + "/plugins");
    }
});
manager.api.addStylesheet(__dirname + "/src/css/style.css");
manager.setupPlugins();
manager.startPlugins();
window.addEventListener("unload", function () {
    manager.stopPlugins();
    node_console.log("window closes");
});
