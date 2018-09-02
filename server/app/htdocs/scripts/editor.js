"use strict";

window.onbeforeunload = function () {
  return false;
};

var editor = {

  highlights: server.loadFileSync("/hightlights.json"),

  actual: undefined,

  opened: {},

  getMode: function getMode(ending) {
    if (editor.highlights[ending]) return editor.highlights[ending];
    return ending;
  },
  save: function save() {
    if (editor.actual) editor.opened[editor.actual].save();else swal("Nothing to save!", "Sorry, but there is nothing to save, please select a file!", "error");
  },
  undo: function undo() {
    if (editor.actual) editor.opened[editor.actual].editor.undo();else swal("Nothing to undo!", "Sorry, but there is nothing to undo, please select a file!", "error");
  },
  redo: function redo() {
    if (editor.actual) editor.opened[editor.actual].editor.redo();else swal("Nothing to redo!", "Sorry, but there is nothing to redo, please select a file!", "error");
  },
  open: function open(path) {
    if (editor.opened[path]) return false;
    var res = server.getFileSync(path);

    var file = res.file;

    $("#editorcontainer .CodeMirror").hide();

    editor.actual = path;

    var mode = editor.getMode(file.type);
    var aw = createEditor(mode, file.content);
    var div = aw.div;
    var edit = aw.editor;
    aw.save = function () {
      server.saveFile(path, edit.getDoc().getValue()).then(function (res) {
        editor.opened[path].content = edit.getDoc().getValue();
        frame.removeClass('edited');
        swal("Successfully saved!", "File successfully saved to \"" + res.file.path + "\"", "success");
      });
    };
    editor.opened[path] = aw;

    $("#editorfiles div.openedfile.selected").removeClass('selected');
    $("#editorfiles #editorfilescontainer").append("<div class=\"openedfile selected\" path=\"" + path + "\"><p>" + file.name + "</p><i class=\"material-icons close\">close</i></div>");

    var frame = $("#editorfiles div.selected");

    $("#editorfiles div.selected").click(function (e) {
      $("#editorfiles div.openedfile.selected").removeClass('selected');
      $(this).addClass('selected');
      editor.actual = path;
      $("#editorcontainer .CodeMirror").hide();
      $(div).show();
    }).children("i.close").click(function () {
      if ($(this).is(".selected")) editor.actual = undefined;
      server.sendUpdateCloseFile(path);
      $(this).parent().remove();
      $(div).remove();
      delete editor.opened[path];
      return false;
    });

    edit.on("change", function (cmirror) {
      if (editor.opened[path].content != edit.getDoc().getValue()) frame.addClass('edited');else frame.removeClass('edited');
    });
  }
};

$(document).ready(function () {

  setInterval(function () {
    $("#editorcontainer").height($(window).height() - 20);
    $("#editorcontainer").width($(window).width() - 300);
    $("#editorcontainer .CodeMirror").height($("#editorcontainer").height() - 31);
    $("#editorcontainer .CodeMirror").width($("#editorcontainer").width() - 2);
    $("#editorcontainer #editorfiles").width($("#editorcontainer").width() - 2);
  }, 10);

  $("#editorcontainer .CodeMirror").hide();
});

function createEditor(mode, value) {

  var id = guid();
  $("#editorcontainer").append("<textarea id=\"" + id + "\">" + value + "</textarea>");

  var editor = CodeMirror.fromTextArea(document.getElementById(id), {
    mode: mode,
    tabSize: 4,
    lineNumbers: true,
    firstLineNumber: 1,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Alt-F": "findPersistent",
      "F11": function F11(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function Esc(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      },
      "Ctrl-Q": function CtrlQ(cm) {
        cm.foldCode(cm.getCursor());
      }
    },
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
    scrollbarStyle: "simple",
    styleActiveLine: true,
    theme: "mtheme"
  });
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

  function looksLikeScheme(code) {
    return !/^\s*\(\s*function\b/.test(code) && /^\s*[;\(]/.test(code);
  }

  var id2 = guid();
  $("#editorcontainer .CodeMirror").not('.hasid').attr('id', id2);
  $("#editorcontainer .CodeMirror").not('.hasid').addClass('hasid');
  $("#id").remove();

  value = editor.getDoc().getValue();

  return { editor: editor, id: id, div: document.getElementById(id2), content: value };
}