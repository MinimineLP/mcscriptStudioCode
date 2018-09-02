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