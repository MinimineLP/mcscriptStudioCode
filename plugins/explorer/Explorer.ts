import { PluginApi, Api, Plugin } from "@mcscriptstudiocode/pluginmanager";
import { Editor } from "@mcscriptstudiocodeplugins/editor";
import {
  ContextMenuAPI,
  ContextMenuPoint,
  ContextMenu
} from "@mcscriptstudiocodeplugins/contextmenu";

declare class MenuActionAPI implements Api {
  name: string;
  version: string;
  listeners: any;
  on(key: string, func: Function);
  trigger(key: string);
}

declare let working_dir: string;
declare let global: any;

import * as fs from "fs";
import * as os from "os";
import * as $ from "jquery";
import * as swal from "sweetalert";
let editor: Editor;
let ctxmenuapi: ContextMenuAPI;

let dir = working_dir.replace(/\\/g, "/") + "/";
let rle: Function;

export default class Explorer extends Plugin {
  setup() {
    this.api.addElement(`<div id="explorer"><h3>Project Explorer</h3></div>`);
    this.api.addStylesheet(`${__dirname}/style/css/global.min.css`);
    this.api.registerAPI("explorer", new ExplorerAPI());
  }

  start() {
    editor = <Editor>this.api.getAPI("editor");
    ctxmenuapi = this.api.getAPI("contextmenu");
    $("#explorer").mousedown(function(event) {
      if (event.which == 1) {
        $("#explorer .active").removeClass("active");
        if (
          $(event.target).prop("nodeName") == "P" ||
          $(event.target).prop("nodeName") == "I" ||
          $(event.target).prop("nodeName") == "IMG"
        )
          $(event.target.parentNode).addClass("active");
        $(event.target).addClass("active");
      }
    });
    $("#explorer").mouseup(function(event) {
      if (event.which == 1) $("#explorer .active").removeClass("active");
    });
    $("#explorer").click(function(event) {
      if (event.which == 1) {
        if ($(event.target).prop("nodeName") == "LI")
          $(event.target)
            .children("i")
            .trigger("click");
        if (
          $(event.target).prop("nodeName") == "P" ||
          $(event.target).prop("nodeName") == "IMG"
        )
          $(event.target)
            .parent()
            .children("i")
            .trigger("click");
      }
    });
    $("#explorer").mouseover(function(event) {
      $("#explorer .hover").removeClass("hover");
      if (
        $(event.target).prop("nodeName") == "P" ||
        $(event.target).prop("nodeName") == "I" ||
        $(event.target).prop("nodeName") == "IMG"
      )
        $(event.target.parentNode).addClass("hover");
      $(event.target).addClass("hover");
    });
    $("#explorer").mouseleave(function(event) {
      $("#explorer .hover").removeClass("hover");
    });
    $("#explorer").bind("contextmenu", function(e) {
      let target = $(event.target);
      if (
        $(event.target).prop("nodeName") == "P" ||
        $(event.target).prop("nodeName") == "I" ||
        $(event.target).prop("nodeName") == "IMG"
      )
        target = target.parent();

      if (target.prop("nodeName") != "LI") return;

      let path = target.attr("path");
      if (fs.lstatSync(path).isDirectory())
        ctxmenuapi.show(
          new ContextMenu([
            [
              new ContextMenuPoint({
                name: "New File",
                click: function() {
                  showCreateDialogFile(path + "/");
                }
              }),
              new ContextMenuPoint({
                name: "New Folder",
                click: function() {
                  showCreateDialogFolder(path + "/");
                }
              })
            ],
            [
              new ContextMenuPoint({
                name: "Rename",
                click: function() {
                  showRenameDialog(path);
                }
              }),
              new ContextMenuPoint({
                name: "Delete",
                click: function() {
                  showDeleteDialog(path);
                }
              })
            ]
          ])
        );
      if (fs.lstatSync(path).isFile())
        ctxmenuapi.show(
          new ContextMenu([
            [
              new ContextMenuPoint({
                name: "Rename",
                click: function() {
                  showRenameDialog(path);
                }
              }),
              new ContextMenuPoint({
                name: "Delete",
                click: function() {
                  showDeleteDialog(path);
                }
              })
            ]
          ])
        );
      e.preventDefault();
    });

    let menuactionapi: MenuActionAPI = this.api.getAPI("menu_action");
    menuactionapi.on("file.new", function() {
      showCreateDialogFile();
    });
    menuactionapi.on("file.new_folder", function() {
      showCreateDialogFolder();
    });
    startExplorer(this.api);
  }

  stop() {}

  reload() {}
}

function startExplorer(api: PluginApi) {
  let explorer_openedfolders = ["/"];
  fs.watchFile(working_dir, {}, reloadExplorer);
  reloadExplorer();

  async function reloadExplorer() {
    let dir = working_dir;
    let files = listFiles(dir);
    for (let i in api.getAPI("explorer").orl)
      files = api.getAPI("explorer").orl[i](files);

    function generateHTMLTree(key, files) {
      function getIcon(file) {
        let ending = file.split(".")[file.split(".").length - 1];
        switch (ending) {
          case "mcscript":
            return `${__dirname}/assets/icons/mcscript.png`;
          case "mcfunction":
            return `${__dirname}/assets/icons/mcfunction.png`;
          case "mcmeta":
            return `${__dirname}/assets/icons/mcmeta.png`;
          default:
            return `${__dirname}/assets/icons/unknown.png`;
        }
      }
      let name = key;
      if (name.endsWith("/")) name = name.replace(/\/$/, "");
      name = filename(name);

      if (files instanceof Object) {
        var ret = `<li class="dir" path="${key}"><i class="material-icons">keyboard_arrow_right</i><img src="${__dirname}/assets/icons/folder.png" /><p>${name}</p><ul style="display: none">`;
        for (let k in files) {
          ret += generateHTMLTree(`${key}/${k}`, files[k]);
        }
        ret += `</ul></li>`;
        return ret;
      } else {
        return `<li class="file" path="${files}"><img src="${getIcon(
          files
        )}" /><p>${name}</p></li>`;
      }
    }
    $("#explorerlist").remove();
    $("#explorer").append(
      `<ul id="explorerlist">${generateHTMLTree(dir, files)}</p>`
    );

    $("#explorer ul li i").click(function() {
      var path = $(this)
        .parent()
        .attr("path");
      if ($(this).text() == "keyboard_arrow_down") {
        $(this)
          .parent()
          .children("ul")
          .hide();
        $(this).text("keyboard_arrow_right");
        delete explorer_openedfolders[explorer_openedfolders.indexOf(path)];
      } else {
        $(this)
          .parent()
          .children("ul")
          .show();
        $(this).text("keyboard_arrow_down");
        explorer_openedfolders.push(path);
      }
    });

    $("#explorer .file").click(function() {
      let path = $(this).attr("path");
      editor.open(path);
    });

    $("#explorer ul li.dir").each(function() {
      if (explorer_openedfolders.includes($(this).attr("path"))) {
        $(this)
          .children("ul")
          .show();
        $(this)
          .children("i")
          .text("keyboard_arrow_down");
      }
    });
  }
  rle = reloadExplorer;
}

class ExplorerAPI {
  orl: Function[] = [];
  onReload(func: Function) {
    this.orl.push(func);
  }
}

function listFiles(directory: string): any {
  if (fs.lstatSync(directory).isDirectory()) {
    let ret: Object = {};
    let files = fs.readdirSync(directory);

    for (var i = 0; i < files.length; i++) {
      if (fs.lstatSync(`${directory}/${files[i]}`).isDirectory())
        ret[files[i]] = listFiles(`${directory}/${files[i]}`);
    }
    for (var i = 0; i < files.length; i++) {
      if (fs.lstatSync(`${directory}/${files[i]}`).isFile())
        ret[files[i]] = listFiles(`${directory}/${files[i]}`);
    }

    return ret;
  } else return directory;
}

function filename(path: string): string {
  return path.match(/[^\\/]*$/)[0];
}

async function showCreateDialogFile(standartpath = ""): Promise<string> {
  standartpath = standartpath.replace(/\\/g, "/").replace(dir, "");
  //@ts-ignore
  let res = await swal({
    text: "Type in the file you want to create",
    content: {
      element: "input",
      attributes: {
        value: standartpath,
        placeholder: "The file path",
        type: "text"
      }
    },
    buttons: true
  });
  if (res == null) return;
  res = res.replace(/\\/g, "/");

  if (res != null && res != "" && !fs.existsSync(dir + res)) {
    //res.substring(res.lastIndexOf("/scripts/")+7,res.length)
    if (res.endsWith(".mcscript"))
      fs.writeFileSync(
        dir + res,
        `#file: ./unknown\n\n/**\n * @author ${
          os.userInfo().username
        }\n * @project unknown\n * @since 0.0.1\n * @version 0.0.1\n *\n */\n\n\n`,
        "utf-8"
      );
    else if (res.endsWith("pack.mcmeta"))
      fs.writeFileSync(
        dir + res,
        `{\n  "pack": {\n    "pack_format": 1,\n    "description": "Pack generated by mcscriptStudioCode"\n  }\n}`,
        "utf-8"
      );
    else fs.writeFileSync(dir + res, "", "utf-8");
  }
  rle();
  return res;
}

function deleteFolderRecursive(path: fs.PathLike) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

async function showCreateDialogFolder(standartpath = ""): Promise<string> {
  standartpath = standartpath.replace(/\\/g, "/").replace(dir, "");
  //@ts-ignore
  let res = await swal({
    text: "Type in the folder you want to create",
    content: {
      element: "input",
      attributes: {
        value: standartpath,
        placeholder: "The file path",
        type: "text"
      }
    },
    buttons: true
  });
  if (res == null) return;
  res = res.replace(/\\/g, "/");

  if (res != null && res != "" && !fs.existsSync(working_dir + "/" + res)) {
    fs.mkdirSync(dir + res);
  }
  rle();
  return res;
}

async function showRenameDialog(path): Promise<string> {
  path = path.replace(/\\/g, "/").replace(dir, "");
  //@ts-ignore
  let res = await swal({
    text: "Please type in the file name",
    content: {
      element: "input",
      attributes: {
        value: path,
        placeholder: path,
        type: "text"
      }
    },
    buttons: true
  });
  if (res == null) return;
  res = res.replace(/\\/g, "/");

  console.log(res);
  fs.renameSync(dir + path, dir + res);
  rle();
  return res;
}

async function showDeleteDialog(path): Promise<string> {
  let res;
  if (fs.lstatSync(path).isFile())
    //@ts-ignore
    res = await swal({
      dangerMode: true,
      text:
        'Do you realy want to delete file "/' +
        path.replace(/\\/g, "/").replace(dir, "") +
        '"',
      buttons: true
    });
  else if (fs.lstatSync(path).isDirectory())
    //@ts-ignore
    res = await swal({
      dangerMode: true,
      text:
        'Do you realy want to delete folder "/' +
        path.replace(/\\/g, "/").replace(dir, "") +
        '"',
      buttons: true
    });
  if (!res) return;
  if (fs.lstatSync(path).isDirectory()) deleteFolderRecursive(path);
  else fs.unlinkSync(path);
  rle();
  return res;
}

global.ExplorerAPI = ExplorerAPI;
