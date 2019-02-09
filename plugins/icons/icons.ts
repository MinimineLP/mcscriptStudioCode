import { Plugin } from "@mcscriptstudiocode/pluginmanager";

export default class Explorer extends Plugin {
  setup() {
    this.api.addStylesheet(
      require.resolve("@mdi/font/css/materialdesignicons.min.css")
    );
    this.api.addStylesheet(
      require.resolve("material-icons/iconfont/material-icons.css")
    );
  }

  start() {}

  stop() {}

  reload() {}
}
