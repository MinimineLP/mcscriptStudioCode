"use strict";

var explorer_openedfolders = ["/"];
$(document).ready(function () {
  setInterval(function () {
    $("#explorer").height($(window).height() - 20);
  }, 10);

  setInterval(function () {
    reloadExplorer();
  }, 1000);
});

async function reloadExplorer() {
  var res = await server.getFiles();
  var dir = res.working_dir;
  var files = res.files;

  function generateHTMLTree(key, files) {
    function getIcon(file) {
      var ending = file.split(".")[file.split(".").length - 1];
      switch (ending) {
        case "mcscript":
          return "/images/explorericons/mcscript.png";
          break;
        case "mcfunction":
          return "/images/explorericons/mcfunction.png";
          break;
        case "mcmeta":
          return "/images/explorericons/mcmeta.png";
          break;
        default:
          return "/images/explorericons/unknown.png";
          break;
      }
    }
    var name = key;
    if (name.endsWith("/")) name = name.replace(/\/$/, "");
    name = name.substring(name.lastIndexOf("/") + 1, name.length);

    if (files instanceof Object) {
      var ret = "<li class=\"dir\" path=\"" + key + "\"><i class=\"material-icons\">keyboard_arrow_right</i><img src=/images/explorericons/folder.png /><p>" + name + "</p><ul style=\"display: none\">";
      for (var k in files) {
        ret += generateHTMLTree(key + "/" + k, files[k]);
      }
      ret += "</ul></li>";
      return ret;
    } else {
      return "<li class=\"file\" path=\"" + files + "\"><img src=\"" + getIcon(files) + "\" /><p>" + name + "</p></li>";
    }
  }
  $("#explorerlist").remove();
  $("#explorer").append("<ul id=\"explorerlist\">" + generateHTMLTree(dir, files) + "</p>");

  $("#explorer ul li i").click(function (e) {
    var path = $(this).parent().attr('path');
    if ($(this).text() == "keyboard_arrow_down") {
      $(this).parent().children('ul').hide();
      $(this).text("keyboard_arrow_right");
      explorer_openedfolders.remove(path);
    } else {
      $(this).parent().children('ul').show();
      $(this).text("keyboard_arrow_down");
      explorer_openedfolders.push(path);
    }
  });

  $("#explorer .file").click(function () {
    var path = $(this).attr('path');
    editor.open(path);
  });

  $("#explorer ul li.dir").each(function () {
    if (explorer_openedfolders.includes($(this).attr('path'))) $(this).children('i').trigger('click');
  });

  /*
  $("#explorer ul li:has(i)").click(function(event) {
    $(this).children('i').trigger('click');
  });*/
}