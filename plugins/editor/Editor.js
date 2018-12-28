"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var editor_1 = require("./scripts/editor");
var pluginmanager_1 = require("@mcscriptstudiocode/pluginmanager");
var Explorer = /** @class */ (function (_super) {
    __extends(Explorer, _super);
    function Explorer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Explorer.prototype.setup = function (server) {
        this.server = server;
        server.addElement("<div id=\"editorcontainer\"><div id=\"editorfiles\"><div id=\"editorfilescontainer\"></div></div></div>");
        require("codemirror/lib/codemirror.js");
        require("codemirror/addon/dialog/dialog.js");
        require("codemirror/addon/search/searchcursor.js");
        require("codemirror/addon/search/search.js");
        require("codemirror/addon/scroll/annotatescrollbar.js");
        require("codemirror/addon/search/matchesonscrollbar.js");
        require("codemirror/addon/search/jump-to-line.js");
        require("codemirror/addon/selection/active-line.js");
        require("codemirror/addon/edit/matchbrackets.js");
        require("codemirror/addon/display/fullscreen.js");
        require("codemirror/addon/scroll/simplescrollbars.js");
        require("codemirror/addon/edit/closetag.js");
        require("codemirror/addon/fold/foldcode.js");
        require("codemirror/addon/fold/foldgutter.js");
        require("codemirror/addon/fold/brace-fold.js");
        require("codemirror/addon/fold/xml-fold.js");
        require("codemirror/addon/fold/indent-fold.js");
        require("codemirror/addon/fold/markdown-fold.js");
        require("codemirror/addon/fold/comment-fold.js");
        require("codemirror/addon/selection/active-line.js");
        require("codemirror/addon/mode/simple.js");
        require("codemirror/addon/mode/overlay.js");
        require("codemirror/addon/hint/javascript-hint.js");
        require("codemirror/mode/javascript/javascript.js");
        require("codemirror/mode/scheme/scheme.js");
        server.addStylesheet(require.resolve("codemirror/lib/codemirror.css"));
        server.addStylesheet(require.resolve("codemirror/addon/hint/show-hint.css"));
        server.addStylesheet(require.resolve("codemirror/addon/dialog/dialog.css"));
        server.addStylesheet(require.resolve("codemirror/addon/search/matchesonscrollbar.css"));
        server.addStylesheet(require.resolve("codemirror/addon/display/fullscreen.css"));
        server.addStylesheet(require.resolve("codemirror/addon/scroll/simplescrollbars.css"));
        server.addStylesheet(require.resolve("codemirror/addon/fold/foldgutter.css"));
        server.addStylesheet(require.resolve("codemirror/lib/codemirror.css"));
        server.addStylesheet(require.resolve("codemirror/theme/3024-day.css"));
        server.addStylesheet(require.resolve("codemirror/theme/3024-night.css"));
        server.addStylesheet(require.resolve("codemirror/theme/abcdef.css"));
        server.addStylesheet(require.resolve("codemirror/theme/ambiance.css"));
        server.addStylesheet(require.resolve("codemirror/theme/base16-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/bespin.css"));
        server.addStylesheet(require.resolve("codemirror/theme/base16-light.css"));
        server.addStylesheet(require.resolve("codemirror/theme/blackboard.css"));
        server.addStylesheet(require.resolve("codemirror/theme/cobalt.css"));
        server.addStylesheet(require.resolve("codemirror/theme/colorforth.css"));
        server.addStylesheet(require.resolve("codemirror/theme/dracula.css"));
        server.addStylesheet(require.resolve("codemirror/theme/duotone-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/duotone-light.css"));
        server.addStylesheet(require.resolve("codemirror/theme/eclipse.css"));
        server.addStylesheet(require.resolve("codemirror/theme/elegant.css"));
        server.addStylesheet(require.resolve("codemirror/theme/erlang-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/gruvbox-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/hopscotch.css"));
        server.addStylesheet(require.resolve("codemirror/theme/icecoder.css"));
        server.addStylesheet(require.resolve("codemirror/theme/isotope.css"));
        server.addStylesheet(require.resolve("codemirror/theme/lesser-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/liquibyte.css"));
        server.addStylesheet(require.resolve("codemirror/theme/lucario.css"));
        server.addStylesheet(require.resolve("codemirror/theme/material.css"));
        server.addStylesheet(require.resolve("codemirror/theme/mbo.css"));
        server.addStylesheet(require.resolve("codemirror/theme/mdn-like.css"));
        server.addStylesheet(require.resolve("codemirror/theme/midnight.css"));
        server.addStylesheet(require.resolve("codemirror/theme/monokai.css"));
        server.addStylesheet(require.resolve("codemirror/theme/neat.css"));
        server.addStylesheet(require.resolve("codemirror/theme/neo.css"));
        server.addStylesheet(require.resolve("codemirror/theme/night.css"));
        server.addStylesheet(require.resolve("codemirror/theme/oceanic-next.css"));
        server.addStylesheet(require.resolve("codemirror/theme/panda-syntax.css"));
        server.addStylesheet(require.resolve("codemirror/theme/paraiso-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/paraiso-light.css"));
        server.addStylesheet(require.resolve("codemirror/theme/pastel-on-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/railscasts.css"));
        server.addStylesheet(require.resolve("codemirror/theme/rubyblue.css"));
        server.addStylesheet(require.resolve("codemirror/theme/seti.css"));
        server.addStylesheet(require.resolve("codemirror/theme/shadowfox.css"));
        server.addStylesheet(require.resolve("codemirror/theme/solarized.css"));
        server.addStylesheet(require.resolve("codemirror/theme/the-matrix.css"));
        server.addStylesheet(require.resolve("codemirror/theme/tomorrow-night-bright.css"));
        server.addStylesheet(require.resolve("codemirror/theme/tomorrow-night-eighties.css"));
        server.addStylesheet(require.resolve("codemirror/theme/ttcn.css"));
        server.addStylesheet(require.resolve("codemirror/theme/twilight.css"));
        server.addStylesheet(require.resolve("codemirror/theme/vibrant-ink.css"));
        server.addStylesheet(require.resolve("codemirror/theme/xq-dark.css"));
        server.addStylesheet(require.resolve("codemirror/theme/xq-light.css"));
        server.addStylesheet(require.resolve("codemirror/theme/yeti.css"));
        server.addStylesheet(require.resolve("codemirror/theme/idea.css"));
        server.addStylesheet(require.resolve("codemirror/theme/darcula.css"));
        server.addStylesheet(require.resolve("codemirror/theme/zenburn.css"));
        require("codemirror/mode/xml/xml.js");
        require("codemirror/mode/markdown/markdown.js");
        require("codemirror/mode/gfm/gfm.js");
        require("codemirror/mode/javascript/javascript.js");
        require("codemirror/mode/css/css.js");
        require("codemirror/mode/yaml/yaml.js");
        require("codemirror/mode/htmlmixed/htmlmixed.js");
        require(__dirname + "/scripts/language-mcfunction.js");
        require(__dirname + "/scripts/language-mcscript.js");
        require(__dirname + "/scripts/MineEditor.js");
        server.addStylesheet(__dirname + "/css/editor.min.css");
        server.addStylesheet(__dirname + "/css/MineEditor.min.css");
        server.registerAPI("editor", editor_1.editor);
    };
    Explorer.prototype.start = function (server) {
        var menuactionapi = server.getAPI("menu_action");
        menuactionapi.on("file.save", editor_1.editor.save);
        this.server = server;
    };
    Explorer.prototype.stop = function (server) {
        this.server = server;
    };
    Explorer.prototype.reload = function (server) {
        this.server = server;
    };
    return Explorer;
}(pluginmanager_1.Plugin));
exports["default"] = Explorer;
