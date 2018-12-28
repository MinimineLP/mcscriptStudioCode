import {ServerApi} from '@mcscriptstudiocode/pluginmanager';

declare class ShortcutbarAPI {

  id:string;
  server: ServerApi;

  constructor(server:ServerApi);

  addButton(id:string,name:string,icon:string,onclick:any):void;

}

export {ShortcutbarAPI}
module.exports = {ShortcutbarAPI: ShortcutbarAPI}
