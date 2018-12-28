import { ServerApi , Plugin } from '@mcscriptstudiocode/pluginmanager';
import { Config, FileFormatters } from '@mcscriptstudiocode/Config';
import {ShortcutbarAPI} from '@mcscriptstudiocodeplugins/shortcutbar'
declare let working_dir:string;

import * as mcscript from "mcscript";
import * as fs from 'fs';

let config:Config;

export default class Shortcutbar extends Plugin {

  server:ServerApi;

  setup(server:ServerApi){
    this.server = server;
  }

  start(server:ServerApi){
    this.server = server;
    config = new Config(`${__dirname}/config.yml`,FileFormatters.Yaml);
    loadConfig();
    let b:boolean=true;
    fs.watch(working_dir, function(...arg) {

      if(!b)return;
      b = false;
      if(config.get("autocompile")&&arg[1].endsWith(".mcscript"))mcscript.compile(working_dir,true);
      b = true;
    });
    let api:ShortcutbarAPI = server.getAPI("shortcutbar");
    api.addButton("mcscript_compile", "compile mcscript files", `<i class="mdi mdi-play"></i>`, function() {
      mcscript.compile(working_dir,true);
    });
  }

  stop(server:ServerApi){
    this.server = server;
  }

  reload(server:ServerApi) {
    this.server = server;
  }
}

function loadConfig() {
  config.load();
  config.setStandart("autocompile",true);
  config.save();
}
