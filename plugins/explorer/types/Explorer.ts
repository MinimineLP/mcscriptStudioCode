declare class ExplorerAPI {
  orl: Function[];
  onReload(func: Function): void;
}

export { ExplorerAPI };
export default ExplorerAPI;
module.exports = {
  ExplorerAPI: ExplorerAPI,
  default: ExplorerAPI
};
