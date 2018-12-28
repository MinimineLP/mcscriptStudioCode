declare function reloadEditors():void;

import {guid} from "@mcscriptstudiocode/pluginmanager";
import * as swal from 'sweetalert';
import * as $ from 'jquery';
import * as fs from 'fs';
import * as PATH from 'path';
import * as CodeMirror from 'codemirror';

class Highlights {
  mcscript:string = "mcscript"
  mcfunction:string = "mcfunction"
  mcmeta:string = "application/ld+json"
  json:string = "application/ld+json"
  md:string = "gfm"
  js:string = "javascript"
  html:string = "htmlmixed"
  yml:string = "text/x-yaml"
}

class Editor {

  highlights:Highlights = new Highlights();

  actual:string = undefined

  opened:any = {}

  texteditors:any[] = []

  constructor() {
    let THIS = this;
    $(window).keydown(function(event) {
      if(event.ctrlKey)
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
    })
  }

  createEditor(element:HTMLTextAreaElement|HTMLDivElement, mode:string = 'mcscript', theme="default") {
    let editor;
    if(element instanceof HTMLTextAreaElement)editor = CodeMirror.fromTextArea(element, {
      mode: mode,
      tabSize: 2,
      lineNumbers: true,
      firstLineNumber: 1,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Alt-F": "findPersistent",
        "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }
      },
      lineWrapping: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
      scrollbarStyle: "simple",
      theme: theme,
    });
    else editor = CodeMirror.fromDiv(element, {
      mode: mode,
      tabSize: 2,
      lineNumbers: true,
      firstLineNumber: 1,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Alt-F": "findPersistent",
        "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }
      },
      lineWrapping: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
      scrollbarStyle: "simple",
      theme: theme,
    });
    return editor;
  }

  getMode(ending) {
    if(editor.highlights[ending])return editor.highlights[ending];
    return ending;
  }

  save() {
    if(editor.actual)editor.opened[editor.actual].save();
    // @ts-ignore
    else swal("Nothing to save!", `Sorry, but there is nothing to save, please select a file!`, "error");
  }

  undo() {
    if(editor.actual)editor.opened[editor.actual].editor.undo();
  }

  redo() {
    if(editor.actual)editor.opened[editor.actual].editor.redo();
  }

  closeActual(): void {
    if(editor.actual)editor.opened[editor.actual].close();
    // @ts-ignore
    else swal("Nothing to close!", `Sorry, but there is nothing to close!`, "error");
  }

  open(path) {

    if(editor.opened[path])return false;
    let cont:string = fs.readFileSync(path).toString();
    let name:string = PATH.basename(path);

    $("#editorcontainer .CodeMirror").hide();
    $("#editorcontainer .MineEditor").hide();
    $("#editorfiles div.openedfile.selected").removeClass('selected');
    $("#editorfiles #editorfilescontainer").append(`<div class="openedfile selected" path="${path}"><p>${name}</p><i class="material-icons close">close</i></div>`)

    editor.actual = path;

    let mode = editor.getMode(path.match(/[^.]*$/)[0]);
    let aw:any = createEditor(mode,cont);
    let div = aw.div;
    let edit = aw.editor;
    let type = aw.type;
    let frame;

    aw.save = function() {
      if(type=="code"){
        fs.writeFileSync(path,edit.getDoc().getValue());
        editor.opened[path].content = edit.getDoc().getValue();
        frame.removeClass('edited');
        // @ts-ignore
        swal("Successfully saved!", `File successfully saved to "${path}"`, "success");
      }
      else if(type=="text") {
        fs.writeFileSync(path,$(`#${editor.opened[path].id}`).val());
        editor.opened[path].content = $(`#${editor.opened[path].id}`).val();
        frame.removeClass('edited');
        // @ts-ignore
        swal("Successfully saved!", `File successfully saved to "${path}"`, "success");
      }
    }

    let el = $("div#editorfilescontainer div.selected");

    aw.close = function() {
      let close = function() {
        if(path==editor.actual)editor.actual = undefined;
        $(el).remove();
        $(div).remove();
        $(`#${editor.opened[path].id}`).remove();
        reloadEditors();

        // @ts-ignore
        if(editor.texteditors.includes(path))delete editor.texteditors[editor.texteditors.indexOf(path)];
        delete editor.opened[path];
        return false;
      }

      if($(this).parent().hasClass('edited')) {

        // @ts-ignore
        swal({
          title: "Warning!",
          text: "editor file has unsaved edits. If you close it, the edits will be lost forever! Do you realy want to close it?",
          icon: "warning",
          buttons: {
            save: "Save",
            continue: "Save not",
            cancel: "Cancel",
          },
          dangerMode: true,
        })
        .then((res) => {
          if (res=="save") {
            editor.opened[path].save();
            close;
          }
          if (res=="continue") {
              close();
            }
          });
        }else close();
      }

    frame = $("#editorfiles div.selected");

    aw.frame = frame;
    editor.opened[path] = aw;

    $("#editorfiles div.selected").click(function() {
      $("#editorfiles div.openedfile.selected").removeClass('selected');
      $(this).addClass('selected');
      editor.actual = path;
      $("#editorcontainer .CodeMirror").hide();
      $("#editorcontainer .MineEditor").hide();
      $(div).show();
    }).children("i.close").click(aw.close);

    if(aw.type=="code") {
      edit.on("change",function() {
        if(editor.opened[path].content!=edit.getDoc().getValue())frame.addClass('edited');
        else frame.removeClass('edited');
      });
    }
    else if(aw.type=="text") {
      editor.texteditors.push(path);
    }
  }
};

(function() {
  setInterval(function() {
    if(editor.actual)for(let path of editor.texteditors) {
      if(editor.opened[path].content!=$(`#${editor.opened[path].id}`).val())editor.opened[path].frame.addClass('edited');
      else editor.opened[path].frame.removeClass('edited');
    }
  },1);
})();

$(document).ready(function() {

  setInterval(function() {
    $("#editorcontainer .MineEditor .MineEditor-canvas").each(function() {
      $(this).height($(this).parent().height()-$(this).parent().children('.MineEditor-menuebar').height()-$(this).parent().children('.MineEditor-bottom').height()-44);
    });
  },10);

  $("#editorcontainer .CodeMirror").hide();
  $("#editorcontainer .MineEditor").hide();
});

function createEditor(mode,value):EditorCreateAnswer {

  if(mode == "htmlmixed") {
    let id = guid();
    $("#editorcontainer").append(`<textarea id="${id}" class="editor">${value}</textarea>`)
    reloadEditors();
    let area = document.getElementById(id)
    return {editor: area, id: id, content: value, type: "text", div: <HTMLDivElement>document.getElementById(area.getAttribute("editor"))};
  }

  let id = guid();
  $("#editorcontainer").append(`<textarea id="${id}">${value}</textarea>`)

  let editor = CodeMirror.fromTextArea(<HTMLTextAreaElement>document.getElementById(id), {
    mode: mode,
    tabSize: 2,
    lineNumbers: true,
    firstLineNumber: 1,
    extraKeys: {
      "Ctrl-Space": "autocomplete",
      "Alt-F": "findPersistent",
      "F11": function(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      },

      "Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }
    },
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-foldgutter"],
    scrollbarStyle: "simple",
    theme: "mtheme",
  });

  // @ts-ignore
  editor.on("gutterClick", function(cm, n) {
    var info = cm.lineInfo(n);
    cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
  });

  function makeMarker() {
    var marker = document.createElement("div");
    marker.style.color = "#822";
    marker.innerHTML = "<font color=\"red\">&bull;</font>";
    return marker;
  }

  let id2 = guid();
  $("#editorcontainer .CodeMirror").not('.hasid').attr('id', id2);
  $("#editorcontainer .CodeMirror").not('.hasid').addClass('hasid');
  $("#id").remove();

  // @ts-ignore
  value = editor.getDoc().getValue();

  return {editor: editor, id: id, div:  <HTMLDivElement>document.getElementById(id2), content: value, type: "code"};;
}

interface EditorCreateAnswer {
  editor: any;
  id: string;
  div: HTMLDivElement;
  content: string;
  type: "code"|"text";
}

let editor = new Editor();

export default editor;
export {editor,Editor};
