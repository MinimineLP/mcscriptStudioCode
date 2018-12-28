import * as $ from "jquery";
import * as fs from 'fs';
import {PluginManager} from './PluginManager';
declare let icon;

function start() {
  PluginManager.instance.api.addElement(fs.readFileSync(`${__dirname}/../html/preloader.html`,'utf8').replace(/%icon%/g,icon));
  PluginManager.instance.api.addStylesheet(`${__dirname}/../css/preloader.min.css`);
}

function hide() {
  $("#preloader .dots")
    .fadeOut(300, function() {
      $("#preloader .bg_left").animate({ left: "-50%" }, 300);
      $("#preloader .bg_right").animate({ right: "-50%" }, 300, function() {
        $("#preloader").fadeOut(10);
      });
    });
}

export {start,hide};
