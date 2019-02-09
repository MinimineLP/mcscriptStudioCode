"use strict";var __extends=function(){var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)};return function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}}(),__awaiter=function(i,a,l,c){return new(l||(l=Promise))(function(e,t){function n(e){try{o(c.next(e))}catch(e){t(e)}}function r(e){try{o(c.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new l(function(e){e(t.value)}).then(n,r)}o((c=c.apply(i,a||[])).next())})},__generator=function(n,r){var o,i,a,e,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,a&&(t=[2&t[0],a.value]),t[0]){case 0:case 1:a=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,i=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!(a=0<(a=l.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){l=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){l.label=t[1];break}if(6===t[0]&&l.label<a[1]){l.label=a[1],a=t;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(t);break}a[2]&&l.ops.pop(),l.trys.pop();continue}t=r.call(n,l)}catch(e){t=[6,e],i=0}finally{o=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}};exports.__esModule=!0;var editor,ctxmenuapi,rle,pluginmanager_1=require("@mcscriptstudiocode/pluginmanager"),contextmenu_1=require("@mcscriptstudiocodeplugins/contextmenu"),fs=require("fs"),os=require("os"),$=require("jquery"),swal=require("sweetalert"),dir=working_dir.replace(/\\/g,"/")+"/",Explorer=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.setup=function(){this.api.addElement('<div id="explorer"><h3>Project Explorer</h3></div>'),this.api.addStylesheet(__dirname+"/style/css/global.min.css"),this.api.registerAPI("explorer",new ExplorerAPI)},t.prototype.start=function(){editor=this.api.getAPI("editor"),ctxmenuapi=this.api.getAPI("contextmenu"),$("#explorer").mousedown(function(e){1==e.which&&($("#explorer .active").removeClass("active"),"P"!=$(e.target).prop("nodeName")&&"I"!=$(e.target).prop("nodeName")&&"IMG"!=$(e.target).prop("nodeName")||$(e.target.parentNode).addClass("active"),$(e.target).addClass("active"))}),$("#explorer").mouseup(function(e){1==e.which&&$("#explorer .active").removeClass("active")}),$("#explorer").click(function(e){1==e.which&&("LI"==$(e.target).prop("nodeName")&&$(e.target).children("i").trigger("click"),"P"!=$(e.target).prop("nodeName")&&"IMG"!=$(e.target).prop("nodeName")||$(e.target).parent().children("i").trigger("click"))}),$("#explorer").mouseover(function(e){$("#explorer .hover").removeClass("hover"),"P"!=$(e.target).prop("nodeName")&&"I"!=$(e.target).prop("nodeName")&&"IMG"!=$(e.target).prop("nodeName")||$(e.target.parentNode).addClass("hover"),$(e.target).addClass("hover")}),$("#explorer").mouseleave(function(e){$("#explorer .hover").removeClass("hover")}),$("#explorer").bind("contextmenu",function(e){var t=$(event.target);if("P"!=$(event.target).prop("nodeName")&&"I"!=$(event.target).prop("nodeName")&&"IMG"!=$(event.target).prop("nodeName")||(t=t.parent()),"LI"==t.prop("nodeName")){var n=t.attr("path");fs.lstatSync(n).isDirectory()&&ctxmenuapi.show(new contextmenu_1.ContextMenu([[new contextmenu_1.ContextMenuPoint({name:"New File",click:function(){showCreateDialogFile(n+"/")}}),new contextmenu_1.ContextMenuPoint({name:"New Folder",click:function(){showCreateDialogFolder(n+"/")}})],[new contextmenu_1.ContextMenuPoint({name:"Rename",click:function(){showRenameDialog(n)}}),new contextmenu_1.ContextMenuPoint({name:"Delete",click:function(){showDeleteDialog(n)}})]])),fs.lstatSync(n).isFile()&&ctxmenuapi.show(new contextmenu_1.ContextMenu([[new contextmenu_1.ContextMenuPoint({name:"Rename",click:function(){showRenameDialog(n)}}),new contextmenu_1.ContextMenuPoint({name:"Delete",click:function(){showDeleteDialog(n)}})]])),e.preventDefault()}});var e=this.api.getAPI("menu_action");e.on("file.new",function(){showCreateDialogFile()}),e.on("file.new_folder",function(){showCreateDialogFolder()}),startExplorer(this.api)},t.prototype.stop=function(){},t.prototype.reload=function(){},t}(pluginmanager_1.Plugin);function startExplorer(o){var i=["/"];function e(){return __awaiter(this,void 0,void 0,function(){var t,n,r;return __generator(this,function(e){for(r in t=working_dir,n=listFiles(t),o.getAPI("explorer").orl)n=o.getAPI("explorer").orl[r](n);return $("#explorerlist").remove(),$("#explorer").append('<ul id="explorerlist">'+function e(t,n){var r=t;if(r.endsWith("/")&&(r=r.replace(/\/$/,"")),r=filename(r),n instanceof Object){var o='<li class="dir" path="'+t+'"><i class="material-icons">keyboard_arrow_right</i><img src="'+__dirname+'/assets/icons/folder.png" /><p>'+r+'</p><ul style="display: none">';for(var i in n)o+=e(t+"/"+i,n[i]);return o+="</ul></li>"}return'<li class="file" path="'+n+'"><img src="'+function(e){switch(e.split(".")[e.split(".").length-1]){case"mcscript":return __dirname+"/assets/icons/mcscript.png";case"mcfunction":return __dirname+"/assets/icons/mcfunction.png";case"mcmeta":return __dirname+"/assets/icons/mcmeta.png";default:return __dirname+"/assets/icons/unknown.png"}}(n)+'" /><p>'+r+"</p></li>"}(t,n)+"</p>"),$("#explorer ul li i").click(function(){var e=$(this).parent().attr("path");"keyboard_arrow_down"==$(this).text()?($(this).parent().children("ul").hide(),$(this).text("keyboard_arrow_right"),delete i[i.indexOf(e)]):($(this).parent().children("ul").show(),$(this).text("keyboard_arrow_down"),i.push(e))}),$("#explorer .file").click(function(){var e=$(this).attr("path");editor.open(e)}),$("#explorer ul li.dir").each(function(){i.includes($(this).attr("path"))&&($(this).children("ul").show(),$(this).children("i").text("keyboard_arrow_down"))}),[2]})})}fs.watchFile(working_dir,{},e),e(),rle=e}exports.default=Explorer;var ExplorerAPI=function(){function e(){this.orl=[]}return e.prototype.onReload=function(e){this.orl.push(e)},e}();function listFiles(e){if(fs.lstatSync(e).isDirectory()){for(var t={},n=fs.readdirSync(e),r=0;r<n.length;r++)fs.lstatSync(e+"/"+n[r]).isDirectory()&&(t[n[r]]=listFiles(e+"/"+n[r]));for(r=0;r<n.length;r++)fs.lstatSync(e+"/"+n[r]).isFile()&&(t[n[r]]=listFiles(e+"/"+n[r]));return t}return e}function filename(e){return e.match(/[^\\/]*$/)[0]}function showCreateDialogFile(n){return void 0===n&&(n=""),__awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return n=n.replace(/\\/g,"/").replace(dir,""),[4,swal({text:"Type in the file you want to create",content:{element:"input",attributes:{value:n,placeholder:"The file path",type:"text"}},buttons:!0})];case 1:return null==(t=e.sent())?[2]:(null==(t=t.replace(/\\/g,"/"))||""==t||fs.existsSync(dir+t)||(t.endsWith(".mcscript")?fs.writeFileSync(dir+t,"#file: ./unknown\n\n/**\n * @author "+os.userInfo().username+"\n * @project unknown\n * @since 0.0.1\n * @version 0.0.1\n *\n */\n\n\n","utf-8"):t.endsWith("pack.mcmeta")?fs.writeFileSync(dir+t,'{\n  "pack": {\n    "pack_format": 1,\n    "description": "Pack generated by mcscriptStudioCode"\n  }\n}',"utf-8"):fs.writeFileSync(dir+t,"","utf-8")),rle(),[2,t])}})})}function deleteFolderRecursive(n){fs.existsSync(n)&&(fs.readdirSync(n).forEach(function(e){var t=n+"/"+e;fs.lstatSync(t).isDirectory()?deleteFolderRecursive(t):fs.unlinkSync(t)}),fs.rmdirSync(n))}function showCreateDialogFolder(n){return void 0===n&&(n=""),__awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return n=n.replace(/\\/g,"/").replace(dir,""),[4,swal({text:"Type in the folder you want to create",content:{element:"input",attributes:{value:n,placeholder:"The file path",type:"text"}},buttons:!0})];case 1:return null==(t=e.sent())?[2]:(null==(t=t.replace(/\\/g,"/"))||""==t||fs.existsSync(working_dir+"/"+t)||fs.mkdirSync(dir+t),rle(),[2,t])}})})}function showRenameDialog(n){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return n=n.replace(/\\/g,"/").replace(dir,""),[4,swal({text:"Please type in the file name",content:{element:"input",attributes:{value:n,placeholder:n,type:"text"}},buttons:!0})];case 1:return null==(t=e.sent())?[2]:(t=t.replace(/\\/g,"/"),console.log(t),fs.renameSync(dir+n,dir+t),rle(),[2,t])}})})}function showDeleteDialog(n){return __awaiter(this,void 0,void 0,function(){var t;return __generator(this,function(e){switch(e.label){case 0:return fs.lstatSync(n).isFile()?[4,swal({dangerMode:!0,text:'Do you realy want to delete file "/'+n.replace(/\\/g,"/").replace(dir,"")+'"',buttons:!0})]:[3,2];case 1:return t=e.sent(),[3,4];case 2:return fs.lstatSync(n).isDirectory()?[4,swal({dangerMode:!0,text:'Do you realy want to delete folder "/'+n.replace(/\\/g,"/").replace(dir,"")+'"',buttons:!0})]:[3,4];case 3:t=e.sent(),e.label=4;case 4:return t?(fs.lstatSync(n).isDirectory()?deleteFolderRecursive(n):fs.unlinkSync(n),rle(),[2,t]):[2]}})})}global.ExplorerAPI=ExplorerAPI;
//# sourceMappingURL=Explorer.js.map
