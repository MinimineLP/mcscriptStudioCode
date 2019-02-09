import { editor } from "./scripts/editor";
import { Api, Plugin } from "@mcscriptstudiocode/pluginmanager";

declare class MenuActionAPI implements Api {
  name: string;
  version: string;
  listeners: any;
  on(key: string, func: Function);
  trigger(key: string);
}

export default class Explorer extends Plugin {
  setup() {
    this.api.addElement(
      `<div id="editorcontainer"><div id="editorfiles"><div id="editorfilescontainer"></div></div></div>`
    );

    require(`codemirror/lib/codemirror.js`);

    require(`codemirror/addon/dialog/dialog.js`);
    require(`codemirror/addon/search/searchcursor.js`);
    require(`codemirror/addon/search/search.js`);
    require(`codemirror/addon/scroll/annotatescrollbar.js`);
    require(`codemirror/addon/search/matchesonscrollbar.js`);
    require(`codemirror/addon/search/jump-to-line.js`);
    require(`codemirror/addon/selection/active-line.js`);
    require(`codemirror/addon/edit/matchbrackets.js`);
    require(`codemirror/addon/display/fullscreen.js`);
    require(`codemirror/addon/scroll/simplescrollbars.js`);
    require(`codemirror/addon/edit/closetag.js`);
    require(`codemirror/addon/fold/foldcode.js`);
    require(`codemirror/addon/fold/foldgutter.js`);
    require(`codemirror/addon/fold/brace-fold.js`);
    require(`codemirror/addon/fold/xml-fold.js`);
    require(`codemirror/addon/fold/indent-fold.js`);
    require(`codemirror/addon/fold/markdown-fold.js`);
    require(`codemirror/addon/fold/comment-fold.js`);
    require(`codemirror/addon/selection/active-line.js`);
    require(`codemirror/addon/mode/simple.js`);
    require(`codemirror/addon/mode/overlay.js`);

    require(`codemirror/addon/hint/javascript-hint.js`);
    require(`codemirror/mode/javascript/javascript.js`);

    require(`codemirror/mode/scheme/scheme.js`);

    this.api.addStylesheet(require.resolve(`codemirror/lib/codemirror.css`));

    this.api.addStylesheet(
      require.resolve(`codemirror/addon/hint/show-hint.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/addon/dialog/dialog.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/addon/search/matchesonscrollbar.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/addon/display/fullscreen.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/addon/scroll/simplescrollbars.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/addon/fold/foldgutter.css`)
    );

    this.api.addStylesheet(require.resolve(`codemirror/lib/codemirror.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/3024-day.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/3024-night.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/abcdef.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/ambiance.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/base16-dark.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/bespin.css`));
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/base16-light.css`)
    );
    this.api.addStylesheet(require.resolve(`codemirror/theme/blackboard.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/cobalt.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/colorforth.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/dracula.css`));
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/duotone-dark.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/duotone-light.css`)
    );
    this.api.addStylesheet(require.resolve(`codemirror/theme/eclipse.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/elegant.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/erlang-dark.css`));
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/gruvbox-dark.css`)
    );
    this.api.addStylesheet(require.resolve(`codemirror/theme/hopscotch.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/icecoder.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/isotope.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/lesser-dark.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/liquibyte.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/lucario.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/material.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/mbo.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/mdn-like.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/midnight.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/monokai.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/neat.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/neo.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/night.css`));
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/oceanic-next.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/panda-syntax.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/paraiso-dark.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/paraiso-light.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/pastel-on-dark.css`)
    );
    this.api.addStylesheet(require.resolve(`codemirror/theme/railscasts.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/rubyblue.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/seti.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/shadowfox.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/solarized.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/the-matrix.css`));
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/tomorrow-night-bright.css`)
    );
    this.api.addStylesheet(
      require.resolve(`codemirror/theme/tomorrow-night-eighties.css`)
    );
    this.api.addStylesheet(require.resolve(`codemirror/theme/ttcn.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/twilight.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/vibrant-ink.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/xq-dark.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/xq-light.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/yeti.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/idea.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/darcula.css`));
    this.api.addStylesheet(require.resolve(`codemirror/theme/zenburn.css`));

    require(`codemirror/mode/xml/xml.js`);
    require(`codemirror/mode/markdown/markdown.js`);
    require(`codemirror/mode/gfm/gfm.js`);
    require(`codemirror/mode/javascript/javascript.js`);
    require(`codemirror/mode/css/css.js`);
    require(`codemirror/mode/yaml/yaml.js`);
    require(`codemirror/mode/htmlmixed/htmlmixed.js`);

    require(`${__dirname}/scripts/language-mcfunction.js`);
    require(`${__dirname}/scripts/language-mcscript.js`);
    require(`${__dirname}/scripts/MineEditor.js`);
    this.api.addStylesheet(`${__dirname}/style/css/editor.min.css`);
    this.api.addStylesheet(`${__dirname}/style/css/MineEditor.min.css`);
    this.api.registerAPI("editor", editor);
  }

  start() {
    let menuactionapi: MenuActionAPI = <MenuActionAPI> this.api.getAPI("menu_action");
    menuactionapi.on("file.save", editor.save);
  }

  stop() {}

  reload() {}
}
