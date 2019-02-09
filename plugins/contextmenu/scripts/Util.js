"use strict";

exports.__esModule = true;
var ContextMenuPointBuildingOptions = /** @class */function () {
    function ContextMenuPointBuildingOptions() {}
    return ContextMenuPointBuildingOptions;
}();
exports.ContextMenuPointBuildingOptions = ContextMenuPointBuildingOptions;
var ContextMenuPoint = /** @class */function () {
    function ContextMenuPoint(options) {
        this.name = options.name;
        this.click = options.click;
        this.subs = options.subs;
    }
    ContextMenuPoint.prototype.render = function () {
        var li = document.createElement("li");
        var p = document.createElement("p");
        p.innerText = this.name;
        li.appendChild(p);
        if (this.subs) li.appendChild(this.subs.render());
        if (this.click) li.addEventListener("click", this.click);
        return li;
    };
    return ContextMenuPoint;
}();
exports.ContextMenuPoint = ContextMenuPoint;
var ContextMenu = /** @class */function () {
    function ContextMenu(points) {
        if (points === void 0) {
            points = [];
        }
        this.points = points;
    }
    ContextMenu.prototype.push = function () {
        var e = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
        }
        this.points.push(e);
    };
    ;
    ContextMenu.prototype.render = function () {
        var ret = document.createElement("div");
        this.points.forEach(function (i) {
            var ul = document.createElement("ul");
            i.forEach(function (p) {
                ul.appendChild(p.render());
            });
            ret.appendChild(ul);
        });
        return ret;
    };
    return ContextMenu;
}();
exports.ContextMenu = ContextMenu;
global.ContextMenu = ContextMenu;
global.ContextMenuPoint = ContextMenuPoint;
global.ContextMenuPointBuildingOptions = ContextMenuPointBuildingOptions;
//# sourceMappingURL=util.js.map
