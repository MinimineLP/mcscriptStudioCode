"use strict";var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function guid(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}var Server=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"throwRequestError",value:function(e){console.error('Error occured while getting working dir from server: "'+e.error.message+". Get the full answer: ",e)}},{key:"createPacket",value:function(e){return{type:"POST",url:"/server",data:{id:arguments.length>1&&void 0!==arguments[1]?arguments[1]:guid(),action:e},success:function(e){},error:function(e){console.log(e)}}}},{key:"createSyncPacket",value:function(e){return{async:!1,type:"POST",url:"/server",data:{id:arguments.length>1&&void 0!==arguments[1]?arguments[1]:guid(),action:e},success:function(e){},error:function(e){console.log(e)}}}},{key:"packet",value:async function(e,n){arguments.length>2&&void 0!==arguments[2]?arguments[2]:guid();var t=server.createPacket(e);t.data=Object.assign(t.data,n);var r=void 0;return t.success=function(e){e.exception?swal("Server error",e.exception.message,"error"):r=e},await $.ajax(t),r}},{key:"packetSync",value:function(e,n){arguments.length>2&&void 0!==arguments[2]?arguments[2]:guid();var t=server.createSyncPacket(e);t.data=Object.assign(t.data,n);var r=void 0;return t.success=function(e){r=e},$.ajax(t),r}},{key:"loadFile",value:async function(e){var n=void 0;return await $.ajax({type:"POST",url:e,data:{},success:function(e){n=e},error:function(e){console.log(e)}}),n}},{key:"loadFileSync",value:function(e){var n=void 0;return $.ajax({async:!1,type:"POST",url:e,data:{},success:function(e){n=e},error:function(e){console.log(e)}}),n}},{key:"getFile",value:async function(e){return await server.packet("get_file",{file:e})}},{key:"getFileSync",value:function(e){return server.packetSync("get_file",{file:e})}},{key:"getFiles",value:async function(){return await server.packet("get_files",{})}},{key:"getFilesSync",value:function(){return server.packetSync("get_files",{})}},{key:"sendUpdateChangeFile",value:async function(e,n){return await server.packet("send_update_change_file",{file:e,content:n})}},{key:"sendUpdateChangeFileSync",value:function(e,n){return server.packetSync("send_update_change_file",{file:e,content:n})}},{key:"sendUpdateCloseFile",value:async function(e){return await server.packet("send_update_close_file",{file:e})}},{key:"sendUpdateCloseFileSync",value:function(e){return server.packetSync("send_update_close_file",{file:e})}},{key:"getOpenedFiles",value:async function(){return await server.packet("list_opened_files",{})}},{key:"getOpenedFilesSync",value:function(){return server.packetSync("list_opened_files",{})}},{key:"getOpenedFile",value:async function(e){return await server.packet("get_opened_file",{file:e})}},{key:"getOpenedFileSync",value:function(e){return server.packetSync("get_opened_file",{file:e})}},{key:"saveFile",value:async function(e,n){return await server.packet("save_file",{file:e,content:n})}},{key:"saveFileSync",value:function(e,n){return server.packetSync("save_file",{file:e,content:n})}}]),e}(),server=new Server;