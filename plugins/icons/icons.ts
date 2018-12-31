import { ServerApi, Plugin } from "@mcscriptstudiocode/pluginmanager";

export default class Explorer extends Plugin {
  server: ServerApi;

  setup(server) {
    this.server = server;

    server.addStylesheet(
      require.resolve("@mdi/font/css/materialdesignicons.min.css")
    );
    server.addStylesheet(
      require.resolve("material-icons/iconfont/material-icons.css")
    );
  }

  start(server) {
    this.server = server;
  }

  stop(server) {
    this.server = server;
  }

  reload(server) {
    this.server = server;
  }
}
