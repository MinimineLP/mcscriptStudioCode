"use strict";
exports.__esModule = true;
var pluginmanager_1 = require("@mcscriptstudiocode/pluginmanager");
var swal = require("sweetalert");
var $ = require("jquery");
var fs = require("fs");
var PATH = require("path");
var CodeMirror = require("codemirror");
var Highlights = /** @class */ (function () {
    function Highlights() {
        this.mcscript = "mcscript";
        this.mcfunction = "mcfunction";
        this.mcmeta = "application/ld+json";
        this.json = "application/ld+json";
        this.md = "gfm";
        this.js = "javascript";
        this.html = "htmlmixed";
        this.yml = "text/x-yaml";
    }
    return Highlights;
}());
var Editor = /** @class */ (function () {
    function Editor() {
        this.highlights = new Highlights();
        this.actual = undefined;
        this.opened = {};
        this.texteditors = [];
        var THIS = this;
        $(window).keydown(function (event) {
            if (event.ctrlKey)
                switch (event.key) {
                    case "s":
                        event.preventDefault();
                        THIS.save();
                        break;
                    case "z":
                        event.preventDefault();
                        THIS.undo();
                        break;
                    case "y":
                        event.preventDefault();
                        THIS.redo();
                        break;
                    case "w":
                        event.preventDefault();
                        THIS.closeActual();
                        break;
                }
        });
    }
    Editor.prototype.createEditor = function (element, mode, theme) {
        if (mode === void 0) { mode = 'mcscript'; }
        if (theme === void 0) { theme = "default"; }
        var editor;
        if (element instanceof HTMLTextAreaElement)
            editor = CodeMirror.fromTextArea(element, {
                mode: mode,
                tabSize: 2,
                lineNumbers: true,
                firstLineNumber: 1,
                extraKeys: {
                    "Ctrl-Space": "autocomplete",
                    "Alt-F": "findPersistent",
                    "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); }
                },
                lineWrapping: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
                scrollbarStyle: "simple",
                theme: theme
            });
        else
            editor = CodeMirror.fromDiv(element, {
                mode: mode,
                tabSize: 2,
                lineNumbers: true,
                firstLineNumber: 1,
                extraKeys: {
                    "Ctrl-Space": "autocomplete",
                    "Alt-F": "findPersistent",
                    "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); }
                },
                lineWrapping: true,
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
                scrollbarStyle: "simple",
                theme: theme
            });
        return editor;
    };
    Editor.prototype.getMode = function (ending) {
        if (editor.highlights[ending])
            return editor.highlights[ending];
        return ending;
    };
    Editor.prototype.save = function () {
        if (editor.actual)
            editor.opened[editor.actual].save();
        // @ts-ignore
        else
            swal("Nothing to save!", "Sorry, but there is nothing to save, please select a file!", "error");
    };
    Editor.prototype.undo = function () {
        if (editor.actual)
            editor.opened[editor.actual].editor.undo();
    };
    Editor.prototype.redo = function () {
        if (editor.actual)
            editor.opened[editor.actual].editor.redo();
    };
    Editor.prototype.closeActual = function () {
        if (editor.actual)
            editor.opened[editor.actual].close();
        // @ts-ignore
        else
            swal("Nothing to close!", "Sorry, but there is nothing to close!", "error");
    };
    Editor.prototype.open = function (path) {
        if (editor.opened[path])
            return false;
        var cont = fs.readFileSync(path).toString();
        var name = PATH.basename(path);
        $("#editorcontainer .CodeMirror").hide();
        $("#editorcontainer .MineEditor").hide();
        $("#editorfiles div.openedfile.selected").removeClass('selected');
        $("#editorfiles #editorfilescontainer").append("<div class=\"openedfile selected\" path=\"" + path + "\"><p>" + name + "</p><i class=\"material-icons close\">close</i></div>");
        editor.actual = path;
        var mode = editor.getMode(path.match(/[^.]*$/)[0]);
        var aw = createEditor(mode, cont);
        var div = aw.div;
        var edit = aw.editor;
        var type = aw.type;
        var frame;
        aw.save = function () {
            if (type == "code") {
                fs.writeFileSync(path, edit.getDoc().getValue());
                editor.opened[path].content = edit.getDoc().getValue();
                frame.removeClass('edited');
                // @ts-ignore
                swal("Successfully saved!", "File successfully saved to \"" + path + "\"", "success");
            }
            else if (type == "text") {
                fs.writeFileSync(path, $("#" + editor.opened[path].id).val());
                editor.opened[path].content = $("#" + editor.opened[path].id).val();
                frame.removeClass('edited');
                // @ts-ignore
                swal("Successfully saved!", "File successfully saved to \"" + path + "\"", "success");
            }
        };
        var el = $("div#editorfilescontainer div.selected");
        aw.close = function () {
            var close = function () {
                if (path == editor.actual)
                    editor.actual = undefined;
                $(el).remove();
                $(div).remove();
                $("#" + editor.opened[path].id).remove();
                reloadEditors();
                // @ts-ignore
                if (editor.texteditors.includes(path))
                    delete editor.texteditors[editor.texteditors.indexOf(path)];
                delete editor.opened[path];
                return false;
            };
            if ($(this).parent().hasClass('edited')) {
                // @ts-ignore
                swal({
                    title: "Warning!",
                    text: "editor file has unsaved edits. If you close it, the edits will be lost forever! Do you realy want to close it?",
                    icon: "warning",
                    buttons: {
                        save: "Save",
                        "continue": "Save not",
                        cancel: "Cancel"
                    },
                    dangerMode: true
                })
                    .then(function (res) {
                    if (res == "save") {
                        editor.opened[path].save();
                        close;
                    }
                    if (res == "continue") {
                        close();
                    }
                });
            }
            else
                close();
        };
        frame = $("#editorfiles div.selected");
        aw.frame = frame;
        editor.opened[path] = aw;
        $("#editorfiles div.selected").click(function () {
            $("#editorfiles div.openedfile.selected").removeClass('selected');
            $(this).addClass('selected');
            editor.actual = path;
            $("#editorcontainer .CodeMirror").hide();
            $("#editorcontainer .MineEditor").hide();
            $(div).show();
        }).children("i.close").click(aw.close);
        if (aw.type == "code") {
            edit.on("change", function () {
                if (editor.opened[path].content != edit.getDoc().getValue())
                    frame.addClass('edited');
                else
                    frame.removeClass('edited');
            });
        }
        else if (aw.type == "text") {
            editor.texteditors.push(path);
        }
    };
    return Editor;
}());
exports.Editor = Editor;
;
(function () {
    setInterval(function () {
        if (editor.actual)
            for (var _i = 0, _a = editor.texteditors; _i < _a.length; _i++) {
                var path = _a[_i];
                if (editor.opened[path].content != $("#" + editor.opened[path].id).val())
                    editor.opened[path].frame.addClass('edited');
                else
                    editor.opened[path].frame.removeClass('edited');
            }
    }, 1);
})();
$(document).ready(function () {
    setInterval(function () {
        $("#editorcontainer .MineEditor .MineEditor-canvas").each(function () {
            $(this).height($(this).parent().height() - $(this).parent().children('.MineEditor-menuebar').height() - $(this).parent().children('.MineEditor-bottom').height() - 44);
        });
    }, 10);
    $("#editorcontainer .CodeMirror").hide();
    $("#editorcontainer .MineEditor").hide();
});
function createEditor(mode, value) {
    if (mode == "htmlmixed") {
        var id_1 = pluginmanager_1.guid();
        $("#editorcontainer").append("<textarea id=\"" + id_1 + "\" class=\"editor\">" + value + "</textarea>");
        reloadEditors();
        var area = document.getElementById(id_1);
        return { editor: area, id: id_1, content: value, type: "text", div: document.getElementById(area.getAttribute("editor")) };
    }
    var id = pluginmanager_1.guid();
    $("#editorcontainer").append("<textarea id=\"" + id + "\">" + value + "</textarea>");
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        mode: mode,
        tabSize: 2,
        lineNumbers: true,
        firstLineNumber: 1,
        extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Alt-F": "findPersistent",
            "F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm) {
                if (cm.getOption("fullScreen"))
                    cm.setOption("fullScreen", false);
            },
            "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); }
        },
        lineWrapping: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
        scrollbarStyle: "simple",
        theme: "mtheme"
    });
    // @ts-ignore
    editor.on("gutterClick", function (cm, n) {
        var info = cm.lineInfo(n);
        cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
    });
    function makeMarker() {
        var marker = document.createElement("div");
        marker.style.color = "#822";
        marker.innerHTML = "<font color=\"red\">&bull;</font>";
        return marker;
    }
    var id2 = pluginmanager_1.guid();
    $("#editorcontainer .CodeMirror").not('.hasid').attr('id', id2);
    $("#editorcontainer .CodeMirror").not('.hasid').addClass('hasid');
    $("#id").remove();
    // @ts-ignore
    value = editor.getDoc().getValue();
    return { editor: editor, id: id, div: document.getElementById(id2), content: value, type: "code" };
    ;
}
var editor = new Editor();
exports.editor = editor;
exports["default"] = editor;
