import * as fs from "fs";
import { PluginManager } from "./src/scripts/PluginManager";
import * as SiteAPI from "./src/scripts/SiteApi";
import * as Preloader from "./src/scripts/Preloader";
import { Config } from "./src/scripts/Config";
import * as electron from "electron";

declare let window: any;
declare let global: any;

let mainWindow: electron.BrowserWindow = electron.ipcRenderer.sendSync(
  "get_window",
  "get_window"
);

global.toggleDevTools = function() {
  electron.ipcRenderer.send("devtools", "toggle");
};
global.openDevTools = function() {
  electron.ipcRenderer.send("devtools", "open");
};
global.closeDevTools = function() {
  electron.ipcRenderer.send("devtools", "close");
};

let config = new Config("config.yml", "yaml");

document.write(
  `<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>MCScript Studio Code</title></head><body></body></html>"`
);

global.working_dir = electron.ipcRenderer.sendSync(
  "get_folder",
  "get_folder"
)[0];
global.icon = electron.ipcRenderer.sendSync("get_icon", "get_icon");

window.alert = function(content: any) {
  return electron.ipcRenderer.sendSync("alert", content.toString());
};

window.prompt = function(title, val) {
  return electron.ipcRenderer.sendSync("prompt", { title, val });
};

let datafolder: string = __dirname + "/..";

if (!fs.existsSync(datafolder)) fs.mkdirSync(datafolder);

const manager: PluginManager = new PluginManager();
Preloader.start();

//SiteAPI.loadSite({host: "raw.githubusercontent.com", path: '/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json', protocoll: 'https'}, function(ret) {
//  for(let url of JSON.parse(ret)) manager.installPlugin(url,`${datafolder}/plugins`);
//});

manager.loadPlugins(datafolder + "/plugins", function() {
  class MenuActionAPI {
    listeners: any = {};
    on(key: string, func: Function) {
      if (!this.listeners[key]) this.listeners[key] = [];
      this.listeners[key].push(func);
    }
    trigger(key: string) {
      if (this.listeners[key])
        this.listeners[key].forEach(function(func: () => any) {
          func();
        });
    }
  }
  electron.ipcRenderer.on("menu_action", function(x, arg) {
    let menuactionapi: MenuActionAPI = manager.api.getAPI("menu_action");
    menuactionapi.trigger(arg);
  });

  manager.api.addStylesheet(`${__dirname}/src/css/style.min.css`);
  manager.api.registerAPI("menu_action", new MenuActionAPI());
  manager.setupPlugins();
  manager.startPlugins();
  window.addEventListener("unload", function() {
    manager.stopPlugins();
  });
  setTimeout(() => {
    Preloader.hide();
  }, 500);
});