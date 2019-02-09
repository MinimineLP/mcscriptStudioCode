"use strict";

exports.__esModule = true;
var $ = require("jquery");
var fs = require("fs");
var PluginManager_1 = require("./PluginManager");
function start() {
    PluginManager_1.PluginManager.instance.api.addElement(fs.readFileSync(__dirname + "/../html/preloader.html", "utf8").replace(/%icon%/g, icon));
    PluginManager_1.PluginManager.instance.api.addStylesheet(__dirname + "/../css/preloader.min.css");
}
exports.start = start;
function hide() {
    $("#preloader .dots").fadeOut(300, function () {
        $("#preloader .bg_left").animate({ left: "-50%" }, 300);
        $("#preloader .bg_right").animate({ right: "-50%" }, 300, function () {
            $("#preloader").fadeOut(10);
        });
    });
}
exports.hide = hide;
//# sourceMappingURL=Preloader.js.map
