"use strict";var _createClass=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}();function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function guid(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}var Server=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"throwRequestError",value:function(e){console.error('Error occured while getting working dir from server: "'+e.error.message+". Get the full answer: ",e)}},{key:"createPacket",value:function(e){return{type:"POST",url:"/server",data:{id:arguments.length>1&&void 0!==arguments[1]?arguments[1]:guid(),action:e},success:function(e){},error:function(e){console.log(e)}}}},{key:"createSyncPacket",value:function(e){return{async:!1,type:"POST",url:"/server",data:{id:arguments.length>1&&void 0!==arguments[1]?arguments[1]:guid(),action:e},success:function(e){},error:function(e){console.log(e)}}}},{key:"packet",value:async function(e,n){arguments.length>2&&void 0!==arguments[2]?arguments[2]:guid();var t=server.createPacket(e);t.data=Object.assign(t.data,n);var r=void 0;return t.success=function(e){e.exception?swal("Server error",e.exception.message,"error"):r=e},await $.ajax(t),r}},{key:"packetSync",value:function(e,n){arguments.length>2&&void 0!==arguments[2]?arguments[2]:guid();var t=server.createSyncPacket(e);t.data=Object.assign(t.data,n);var r=void 0;return t.success=function(e){r=e},$.ajax(t),r}},{key:"loadFile",value:async function(e){var n=void 0;return await $.ajax({type:"POST",url:e,data:{},success:function(e){n=e},error:function(e){console.log(e)}}),n}},{key:"loadFileSync",value:function(e){var n=void 0;return $.ajax({async:!1,type:"POST",url:e,data:{},success:function(e){n=e},error:function(e){console.log(e)}}),n}},{key:"getFile",value:async function(e){return await server.packet("get_file",{file:e})}},{key:"getFileSync",value:function(e){return server.packetSync("get_file",{file:e})}},{key:"getFiles",value:async function(){return await server.packet("get_files",{})}},{key:"getFilesSync",value:function(){return server.packetSync("get_files",{})}},{key:"sendUpdateChangeFile",value:async function(e,n){return await server.packet("send_update_change_file",{file:e,content:n})}},{key:"sendUpdateChangeFileSync",value:function(e,n){return server.packetSync("send_update_change_file",{file:e,content:n})}},{key:"sendUpdateCloseFile",value:async function(e){return await server.packet("send_update_close_file",{file:e})}},{key:"sendUpdateCloseFileSync",value:function(e){return server.packetSync("send_update_close_file",{file:e})}},{key:"getOpenedFiles",value:async function(){return await server.packet("list_opened_files",{})}},{key:"getOpenedFilesSync",value:function(){return server.packetSync("list_opened_files",{})}},{key:"getOpenedFile",value:async function(e){return await server.packet("get_opened_file",{file:e})}},{key:"getOpenedFileSync",value:function(e){return server.packetSync("get_opened_file",{file:e})}},{key:"saveFile",value:async function(e,n){return await server.packet("save_file",{file:e,content:n})}},{key:"saveFileSync",value:function(e,n){return server.packetSync("save_file",{file:e,content:n})}}]),e}(),server=new Server;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var Server = function () {
  function Server() {
    _classCallCheck(this, Server);
  }

  _createClass(Server, [{
    key: 'throwRequestError',
    value: function throwRequestError(res) {
      console.error('Error occured while getting working dir from server: "' + res.error.message + '. Get the full answer: ', res);
    }
  }, {
    key: 'createPacket',
    value: function createPacket(action) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : guid();

      return {
        type: 'POST',
        url: "/server",
        data: {
          id: id,
          action: action
        },
        success: function success(res) {},
        error: function error(err) {
          console.log(err);
        }
      };
    }
  }, {
    key: 'createSyncPacket',
    value: function createSyncPacket(action) {
      var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : guid();

      return {
        async: false,
        type: 'POST',
        url: "/server",
        data: {
          id: id,
          action: action
        },
        success: function success(res) {},
        error: function error(err) {
          console.log(err);
        }
      };
    }
  }, {
    key: 'packet',
    value: async function packet(action, data) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : guid();

      var packet = server.createPacket(action);
      packet.data = Object.assign(packet.data, data);
      var ret = void 0;
      packet.success = function (res) {
        if (res.exception) swal("Server error", res.exception.message, "error");else ret = res;
      };
      await $.ajax(packet);
      return ret;
    }
  }, {
    key: 'packetSync',
    value: function packetSync(action, data) {
      var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : guid();

      var packet = server.createSyncPacket(action);
      packet.data = Object.assign(packet.data, data);
      var ret = void 0;
      packet.success = function (res) {
        ret = res;
      };
      $.ajax(packet);
      return ret;
    }
  }, {
    key: 'loadFile',
    value: async function loadFile(file) {
      var ret = void 0;
      await $.ajax({
        type: 'POST',
        url: file,
        data: {},
        success: function success(res) {
          ret = res;
        },
        error: function error(err) {
          console.log(err);
        }
      });
      return ret;
    }
  }, {
    key: 'loadFileSync',
    value: function loadFileSync(file) {
      var ret = void 0;
      $.ajax({
        async: false,
        type: 'POST',
        url: file,
        data: {},
        success: function success(res) {
          ret = res;
        },
        error: function error(err) {
          console.log(err);
        }
      });
      return ret;
    }
  }, {
    key: 'getFile',
    value: async function getFile(file) {
      return await server.packet("get_file", {
        file: file
      });
    }
  }, {
    key: 'getFileSync',
    value: function getFileSync(file) {
      return server.packetSync("get_file", {
        file: file
      });
    }
  }, {
    key: 'getFiles',
    value: async function getFiles() {
      return await server.packet("get_files", {});
    }
  }, {
    key: 'getFilesSync',
    value: function getFilesSync() {
      return server.packetSync("get_files", {});
    }
  }, {
    key: 'sendUpdateChangeFile',
    value: async function sendUpdateChangeFile(file, history) {
      return await server.packet("send_update_change_file", {
        'file': file,
        'content': history
      });
    }
  }, {
    key: 'sendUpdateChangeFileSync',
    value: function sendUpdateChangeFileSync(file, history) {
      return server.packetSync("send_update_change_file", {
        'file': file,
        'content': history
      });
    }
  }, {
    key: 'sendUpdateCloseFile',
    value: async function sendUpdateCloseFile(path) {
      return await server.packet("send_update_close_file", {
        'file': path
      });
    }
  }, {
    key: 'sendUpdateCloseFileSync',
    value: function sendUpdateCloseFileSync(path) {
      return server.packetSync("send_update_close_file", {
        'file': path
      });
    }
  }, {
    key: 'getOpenedFiles',
    value: async function getOpenedFiles() {
      return await server.packet("list_opened_files", {});
    }
  }, {
    key: 'getOpenedFilesSync',
    value: function getOpenedFilesSync() {
      return server.packetSync("list_opened_files", {});
    }
  }, {
    key: 'getOpenedFile',
    value: async function getOpenedFile(path) {
      return await server.packet("get_opened_file", {
        'file': path
      });
    }
  }, {
    key: 'getOpenedFileSync',
    value: function getOpenedFileSync(path) {
      return server.packetSync("get_opened_file", {
        'file': path
      });
    }
  }, {
    key: 'saveFile',
    value: async function saveFile(path, content) {
      return await server.packet("save_file", {
        'file': path,
        'content': content
      });
    }
  }, {
    key: 'saveFileSync',
    value: function saveFileSync(path, content) {
      return server.packetSync("save_file", {
        'file': path,
        'content': content
      });
    }
  }]);

  return Server;
}();

var server = new Server();
"use strict";document.write('<!DOCTYPE html><html lang="en" dir="ltr"> <head> <meta charset="utf-8"> <link rel="icon" href="/images/icon.png"> <title>Editor test</title> <script>if (typeof module===\'object\'){window.module=module; module=undefined;}<\/script> <script type="text/javascript" src="/scripts/jquery-min.js"><\/script> <script type="text/javascript" src="/codemirror/lib/codemirror.js"><\/script><script type="text/javascript" src="/codemirror/addon/dialog/dialog.js"><\/script><script type="text/javascript" src="/codemirror/addon/search/searchcursor.js"><\/script><script type="text/javascript" src="/codemirror/addon/search/search.js"><\/script><script type="text/javascript" src="/codemirror/addon/scroll/annotatescrollbar.js"><\/script><script type="text/javascript" src="/codemirror/addon/search/matchesonscrollbar.js"><\/script><script type="text/javascript" src="/codemirror/addon/search/jump-to-line.js"><\/script><script type="text/javascript" src="/codemirror/addon/selection/active-line.js"><\/script><script type="text/javascript" src="/codemirror/addon/edit/matchbrackets.js"><\/script><script type="text/javascript" src="/codemirror/addon/display/fullscreen.js"><\/script><script type="text/javascript" src="/codemirror/addon/scroll/simplescrollbars.js"><\/script><script type="text/javascript" src="/codemirror/addon/edit/closetag.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/foldcode.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/foldgutter.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/brace-fold.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/xml-fold.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/indent-fold.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/markdown-fold.js"><\/script><script type="text/javascript" src="/codemirror/addon/fold/comment-fold.js"><\/script><script type="text/javascript" src="/codemirror/addon/selection/active-line.js"><\/script><script type="text/javascript" src="/codemirror/addon/mode/simple.js"><\/script><script type="text/javascript" src="/codemirror/addon/mode/overlay.js"><\/script> <script type="text/javascript" src="/codemirror/addon/hint/javascript-hint.js"><\/script> <script type="text/javascript" src="/codemirror/mode/javascript/javascript.js"><\/script><script type="text/javascript" src="/codemirror/mode/scheme/scheme.js"><\/script><link type="text/css" rel="stylesheet" href="/codemirror/lib/codemirror.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/hint/show-hint.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/dialog/dialog.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/search/matchesonscrollbar.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/display/fullscreen.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/scroll/simplescrollbars.css"><link type="text/css" rel="stylesheet" href="/codemirror/addon/fold/foldgutter.css"/> <script src="/codemirror/mode/xml/xml.js"><\/script> <script src="/codemirror/mode/markdown/markdown.js"><\/script> <script src="/codemirror/mode/gfm/gfm.js"><\/script> <script src="/codemirror/mode/javascript/javascript.js"><\/script> <script src="/codemirror/mode/css/css.js"><\/script> <script src="/codemirror/mode/htmlmixed/htmlmixed.js"><\/script> <script type="text/javascript" src="/scripts/api.js"><\/script> <script type="text/javascript" src="/scripts/prototypes.js"><\/script> <script type="text/javascript" src="/scripts/history.js"><\/script> <script type="text/javascript" src="/scripts/ajax.js"><\/script> <script type="text/javascript" src="/scripts/language-mcfunction.js"><\/script> <script type="text/javascript" src="/scripts/language-mcscript.js"><\/script> <script type="text/javascript" src="/scripts/explorer.js"><\/script> <script type="text/javascript" src="/scripts/editor.js"><\/script> <script type="text/javascript" src="/scripts/setupWindow.js"><\/script> <script type="text/javascript" src="/scripts/keys.js"><\/script> <link type="text/css" rel="stylesheet" href="/css/global.min.css"> <script>if (window.module) module=window.module;<\/script> </head> <body> <div id="bar-top"> <ul> <li>File</li><li>Edit</li><li>View</li><li>Settings</li></ul> </div><div id="explorer"> <h3>Project Explorer</h3> </div><div id="editorcontainer"> <div id="editorfiles"><div id="editorfilescontainer"></div></div><textarea id="editor" class="editor">execute as @s[scores={x=..1}] at @s run say hi black dark_blue dark_green dark_aqua dark_red dark_purple gold gray dark_gray blue green aqua red light_purple yellow white reset bold underline italic strikethrough obfuscated</textarea> </div></body></html>');
"use strict";

document.write("<!DOCTYPE html><html lang=\"en\" dir=\"ltr\"> <head> <meta charset=\"utf-8\"> <link rel=\"icon\" href=\"/images/icon.png\"> <title>Editor test</title> <script>if (typeof module==='object'){window.module=module; module=undefined;}</script> <script type=\"text/javascript\" src=\"/scripts/jquery-min.js\"></script> <script type=\"text/javascript\" src=\"/codemirror/lib/codemirror.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/dialog/dialog.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/search/searchcursor.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/search/search.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/scroll/annotatescrollbar.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/search/matchesonscrollbar.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/search/jump-to-line.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/selection/active-line.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/edit/matchbrackets.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/display/fullscreen.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/scroll/simplescrollbars.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/edit/closetag.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/foldcode.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/foldgutter.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/brace-fold.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/xml-fold.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/indent-fold.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/markdown-fold.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/fold/comment-fold.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/selection/active-line.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/mode/simple.js\"></script><script type=\"text/javascript\" src=\"/codemirror/addon/mode/overlay.js\"></script> <script type=\"text/javascript\" src=\"/codemirror/addon/hint/javascript-hint.js\"></script> <script type=\"text/javascript\" src=\"/codemirror/mode/javascript/javascript.js\"></script><script type=\"text/javascript\" src=\"/codemirror/mode/scheme/scheme.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/lib/codemirror.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/hint/show-hint.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/dialog/dialog.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/search/matchesonscrollbar.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/display/fullscreen.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/scroll/simplescrollbars.css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"/codemirror/addon/fold/foldgutter.css\"/> <script src=\"/codemirror/mode/xml/xml.js\"></script> <script src=\"/codemirror/mode/markdown/markdown.js\"></script> <script src=\"/codemirror/mode/gfm/gfm.js\"></script> <script src=\"/codemirror/mode/javascript/javascript.js\"></script> <script src=\"/codemirror/mode/css/css.js\"></script> <script src=\"/codemirror/mode/htmlmixed/htmlmixed.js\"></script> <script type=\"text/javascript\" src=\"/scripts/api.js\"></script> <script type=\"text/javascript\" src=\"/scripts/prototypes.js\"></script> <script type=\"text/javascript\" src=\"/scripts/history.js\"></script> <script type=\"text/javascript\" src=\"/scripts/ajax.js\"></script> <script type=\"text/javascript\" src=\"/scripts/language-mcfunction.js\"></script> <script type=\"text/javascript\" src=\"/scripts/language-mcscript.js\"></script> <script type=\"text/javascript\" src=\"/scripts/explorer.js\"></script> <script type=\"text/javascript\" src=\"/scripts/editor.js\"></script> <script type=\"text/javascript\" src=\"/scripts/setupWindow.js\"></script> <script type=\"text/javascript\" src=\"/scripts/keys.js\"></script> <link type=\"text/css\" rel=\"stylesheet\" href=\"/css/global.min.css\"> <script>if (window.module) module=window.module;</script> </head> <body> <div id=\"bar-top\"> <ul> <li>File</li><li>Edit</li><li>View</li><li>Settings</li></ul> </div><div id=\"explorer\"> <h3>Project Explorer</h3> </div><div id=\"editorcontainer\"> <div id=\"editorfiles\"><div id=\"editorfilescontainer\"></div></div><textarea id=\"editor\" class=\"editor\">execute as @s[scores={x=..1}] at @s run say hi black dark_blue dark_green dark_aqua dark_red dark_purple gold gray dark_gray blue green aqua red light_purple yellow white reset bold underline italic strikethrough obfuscated</textarea> </div></body></html>");

/*
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>

    <meta charset="utf-8">
    <link rel="icon" href="/images/icon.png">
    <title>Editor test</title>

    <script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>

    <!-- JQuery -->
    <script type="text/javascript" src="/scripts/jquery-min.js"></script>

    <!-- codemirror -->
		<script type="text/javascript" src="/codemirror/lib/codemirror.js"></script>

		<!--Addon-->
		<script type="text/javascript" src="/codemirror/addon/dialog/dialog.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/searchcursor.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/search.js"></script>
		<script type="text/javascript" src="/codemirror/addon/scroll/annotatescrollbar.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/matchesonscrollbar.js"></script>
		<script type="text/javascript" src="/codemirror/addon/search/jump-to-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/edit/matchbrackets.js"></script>
		<script type="text/javascript" src="/codemirror/addon/display/fullscreen.js"></script>
		<script type="text/javascript" src="/codemirror/addon/scroll/simplescrollbars.js"></script>
		<script type="text/javascript" src="/codemirror/addon/edit/closetag.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/foldcode.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/foldgutter.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/brace-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/xml-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/indent-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/markdown-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/fold/comment-fold.js"></script>
		<script type="text/javascript" src="/codemirror/addon/selection/active-line.js"></script>
		<script type="text/javascript" src="/codemirror/addon/mode/simple.js"></script>
		<script type="text/javascript" src="/codemirror/addon/mode/overlay.js"></script>

		<!--Hint-->
    <script type="text/javascript" src="/codemirror/addon/hint/javascript-hint.js"></script>
    <script type="text/javascript" src="/codemirror/mode/javascript/javascript.js"></script>

		<!--Scheme-->
		<script type="text/javascript" src="/codemirror/mode/scheme/scheme.js"></script>

		<link type="text/css" rel="stylesheet" href="/codemirror/lib/codemirror.css">

		<!--Addon-->
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/hint/show-hint.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/dialog/dialog.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/search/matchesonscrollbar.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/display/fullscreen.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/scroll/simplescrollbars.css">
		<link type="text/css" rel="stylesheet" href="/codemirror/addon/fold/foldgutter.css" />

    <!-- Modes -->
    <script src="/codemirror/mode/xml/xml.js"></script>
    <script src="/codemirror/mode/markdown/markdown.js"></script>
    <script src="/codemirror/mode/gfm/gfm.js"></script>
    <script src="/codemirror/mode/javascript/javascript.js"></script>
    <script src="/codemirror/mode/css/css.js"></script>
    <script src="/codemirror/mode/htmlmixed/htmlmixed.js"></script>

    <!-- Scripts -->
    <script type="text/javascript" src="/scripts/api.js"></script>
    <script type="text/javascript" src="/scripts/prototypes.js"></script>
    <script type="text/javascript" src="/scripts/history.js"></script>
    <script type="text/javascript" src="/scripts/ajax.js"></script>
    <script type="text/javascript" src="/scripts/language-mcfunction.js"></script>
    <script type="text/javascript" src="/scripts/language-mcscript.js"></script>
    <script type="text/javascript" src="/scripts/explorer.js"></script>
    <script type="text/javascript" src="/scripts/editor.js"></script>
    <script type="text/javascript" src="/scripts/setupWindow.js"></script>
    <script type="text/javascript" src="/scripts/keys.js"></script>


    <!-- Style -->
    <link type="text/css" rel="stylesheet" href="/css/global.min.css">

    <script>if (window.module) module = window.module;</script>

  </head>
  <body>
    <div id="bar-top">
      <ul>
        <li>File</li>
        <li>Edit</li>
        <li>View</li>
        <li>Settings</li>
      </ul>
    </div>
    <div id="explorer">
      <h3>Project Explorer</h3>
    </div>
    <div id="editorcontainer">
      <div id="editorfiles"><div id="editorfilescontainer"></div></div>
      <textarea id="editor" class="editor">execute as @s[scores={x=..1}] at @s run say hi black dark_blue dark_green dark_aqua dark_red dark_purple gold gray dark_gray blue green aqua red light_purple yellow white reset bold underline italic strikethrough obfuscated</textarea>
    </div>
  </body>
</html>
 */
"use strict";Array.prototype.remove=function(){for(var t,r,e=arguments,i=e.length;i&&this.length;)for(t=e[--i];-1!==(r=this.indexOf(t));)this.splice(r,1);return this};
"use strict";

Array.prototype.remove = function () {
  var what,
      a = arguments,
      L = a.length,
      ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
"use strict";$(document).ready(function(){setTimeout(function(){$(window).trigger("resize")},10)});
'use strict';

$(document).ready(function () {
  setTimeout(function () {
    $(window).trigger('resize');
  }, 10);
});