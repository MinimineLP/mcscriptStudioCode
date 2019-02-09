import * as fs from "fs";
import { PluginManager, Api } from "./src/scripts/PluginManager";
import * as SiteAPI from "./src/scripts/SiteApi";
import * as Preloader from "./src/scripts/Preloader";
import { Config } from "./src/scripts/Config";
import * as electron from "electron";
import * as $ from "jquery";

declare let window: any;
declare let global: any;

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

global.alert = function(content: any) {
  return electron.ipcRenderer.sendSync("alert", content.toString());
};

global.prompt = function(title, val) {
  return electron.ipcRenderer.sendSync("prompt", { title, val });
};

let appdata =
  process.env.APPDATA ||
  (process.platform == "darwin"
    ? process.env.HOME + "Library/Preferences"
    : "/var/local");
let datafolder: string = appdata + "/mcscriptStudioCode";
if (!fs.existsSync(`${datafolder}/plugins`))
  fs.mkdirSync(`${datafolder}/plugins`);

if (!fs.existsSync(datafolder)) fs.mkdirSync(datafolder);

const manager: PluginManager = new PluginManager();
Preloader.start();

manager.readyPluginDir(`${datafolder}/plugins`);

SiteAPI.loadSite(
  {
    host: "raw.githubusercontent.com",
    path: "/MinimineLP/mcscriptStudioCode/master/plugins/core-plugins.json",
    protocoll: "https"
  },
  function(ret) {
    let ready: boolean[] = [];
    let rets: boolean[] = [];
    for (let url of JSON.parse(ret)) {
      let i = ready.length;
      ready.push(false);
      manager.installPlugin(url, `${datafolder}/plugins`, (_err, ret) => {
        rets.push(ret);
        ready[i] = true;
        let rel = true;
        for (let e of ready) {
          if (e == false) rel = false;
        }
        if (rel) {
          for (let e of rets) {
            if (e) {
              location.reload();
              return;
            }
          }
        }
      });
    }
  }
);

manager.loadPlugins(datafolder + "/plugins", function() {
  class MenuActionAPI implements Api {
    name: string = "MenuAction";
    version: string = "0.0.3";
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
  electron.ipcRenderer.on("menu_action", function(_x, arg) {
    let menuactionapi: MenuActionAPI = <MenuActionAPI> manager.api.getAPI("menu_action");
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

$("html").click(e => {
  if (e.target.tagName.toLowerCase() == "a") {
    //@ts-ignore
    electron.shell.openExternal(e.target.href);
    e.preventDefault();
  }
});
