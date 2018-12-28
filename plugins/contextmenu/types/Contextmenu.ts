import {ServerApi} from "@mcscriptstudiocode/pluginmanager"

declare class ContextMenuPointBuildingOptions {
  name:string;
  click?:EventListener;
  subs?:ContextMenu;
}

declare class ContextMenuPoint {

  name:string;
  click?:EventListener;
  subs?:ContextMenu;

  constructor (options:ContextMenuPointBuildingOptions);

  render():HTMLLIElement;
}

declare class ContextMenu {
  points: ContextMenuPoint[][];
  constructor(points?:ContextMenuPoint[][]) ;
  push(...e:ContextMenuPoint[]);
  render():HTMLDivElement;
}

declare class ContextMenuAPI {
  id:string;
  server: ServerApi;
  standartmenu:ContextMenu;
  constructor(server:ServerApi);
  show(menu:ContextMenu);
  hide();
}


export {ContextMenu,ContextMenuPoint,ContextMenuPointBuildingOptions, ContextMenuAPI}
module.exports = {ContextMenu:ContextMenu, ContextMenuPoint:ContextMenuPoint,ContextMenuPointBuildingOptions:ContextMenuPointBuildingOptions, ContextMenuAPI:ContextMenuAPI}
