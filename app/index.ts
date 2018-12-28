import * as fs from 'fs';
import {PluginManager} from './src/scripts/PluginManager';
import * as SiteAPI from './src/scripts/SiteApi';
import * as electron from 'electron';
import * as node_console from 'console';

declare let window:any;
declare let global:any;

document.write(`<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charset="utf-8"><title>MCScript Studio Code</title></head><body></body></html>"`);

global.working_dir = electron.ipcRenderer.sendSync('get_folder', "get_folder")[0];

window.alert = function(content:any) {
  return electron.ipcRenderer.sendSync('alert', content.toString());
}

window.prompt = function(title, val){
  return electron.ipcRenderer.sendSync('prompt', {title, val})
}

let datafolder:string = (process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')) + "/mcscriptStudioCode";
let assets:string = __dirname.replace(/\\/g, "/") + '/../assets';

if(!fs.existsSync(datafolder))fs.mkdirSync(datafolder);

const manager:PluginManager = new PluginManager();

console.log(datafolder + "/plugins");

manager.loadPlugins(datafolder + "/plugins");
SiteAPI.loadSite({host: "raw.githubusercontent.com", path: '/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json', protocoll: 'https'}, function(ret) {
  for(let url of JSON.parse(ret)) manager.installPlugin(url,`${datafolder}/plugins`);
});

manager.api.addStylesheet(`${__dirname}/src/css/style.css`);
manager.setupPlugins();
manager.startPlugins();

window.addEventListener('unload', function(event) {
  manager.stopPlugins();
  node_console.log("window closes")
})
