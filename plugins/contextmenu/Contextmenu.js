"use strict";var __extends=function(){var o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};return function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}}();exports.__esModule=!0;var $=require("jquery"),Standartmenu_1=require("./scripts/Standartmenu"),Util_1=require("./scripts/Util"),pluginmanager_1=require("@mcscriptstudiocode/pluginmanager"),currentMousePos={x:-1,y:-1};$(document).mousemove(function(t){currentMousePos.x=t.clientX,currentMousePos.y=t.clientY});var Contextmenu=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.setup=function(t){(this.server=t).addStylesheet(__dirname+"/css/contextmenu.min.css");var e=new ContextMenuAPI(t);t.registerAPI("contextmenu",e)},e.prototype.start=function(t){this.server=t},e.prototype.stop=function(t){this.server=t},e.prototype.reload=function(t){this.server=t},e}(pluginmanager_1.Plugin);exports.default=Contextmenu;var ContextMenuAPI=function(){function t(t){this.id="contextmenu",this.standartmenu=Standartmenu_1.default,this.server=t;var e=this;t.addElement('<div id="'+this.id+'" style="display:none"></div>'),$(document).click(function(){e.hide()}),$(document).mousedown(function(t){1!=t.which&&e.hide()})}return t.prototype.show=function(t){$("#"+this.id).empty(),$("#"+this.id).append(t.render()),$("#"+this.id).show(),$("#"+this.id).css({top:currentMousePos.y,left:currentMousePos.x})},t.prototype.hide=function(){$("#"+this.id).empty(),$("#"+this.id).hide()},t}();global.ContextMenu=Util_1.ContextMenu,global.ContextMenuAPI=ContextMenuAPI,global.ContextMenuPoint=Util_1.ContextMenuPoint,global.ContextMenuPointBuildingOptions=Util_1.ContextMenuPointBuildingOptions;