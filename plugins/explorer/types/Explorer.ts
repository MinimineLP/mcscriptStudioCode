import { Api } from "@mcscriptstudiocode/pluginmanager";
declare class ExplorerAPI implements Api {
  name: string;
  version: string;
  orl: Function[];
  onReload(func: Function): void;
}

export { ExplorerAPI };
export default ExplorerAPI;
module.exports = {
  ExplorerAPI: ExplorerAPI,
  default: ExplorerAPI
};
