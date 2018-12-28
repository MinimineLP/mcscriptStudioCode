import {toggleDevTools} from 'mcscriptstudiocode'
import {ContextMenu,ContextMenuPoint} from "./util";
import * as ChildProcess from 'child_process';

var start = (process.platform == 'darwin'? 'open': process.platform == 'win32'? 'start': 'xdg-open');

 let standartmenu = new ContextMenu([
  [
    new ContextMenuPoint({name:"toggle Developer-Tools", click:()=>{
      toggleDevTools();
    }}),
    new ContextMenuPoint({name:"Reload", click:()=>{
      window.location.reload();
    }}),
  ],
  [
    new ContextMenuPoint({name:"Open GitHub Repository", click:()=>{
      ChildProcess.exec(start + ' https://github.com/miniminelp/mcscriptstudiocode');
    }}),
    new ContextMenuPoint({name:"By Minimine", click:()=>{
      ChildProcess.exec(start + ' https://github.com/miniminelp');
    }}),
  ]
]);
export default standartmenu;
export {standartmenu};
