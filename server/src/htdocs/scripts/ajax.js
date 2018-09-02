function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class Server {
  throwRequestError(res) {
    console.error(`Error occured while getting working dir from server: "${res.error.message}. Get the full answer: `,res);
  }

  createPacket(action, id=guid()) {
    return {
      type: 'POST',
      url: "/server",
      data: {
        id: id,
        action: action
      },
      success(res) {},
      error(err) {
        console.log(err);
      }
    }
  }

  createSyncPacket(action, id=guid()) {
    return {
      async: false,
      type: 'POST',
      url: "/server",
      data: {
        id: id,
        action: action
      },
      success(res) {},
      error(err) {
        console.log(err);
      }
    }
  }

  async packet(action,data,id=guid()) {
    let packet = server.createPacket(action);
    packet.data = Object.assign(packet.data, data);
    let ret;
    packet.success = function(res) {
      if(res.exception)swal("Server error", res.exception.message, "error");
      else ret = res;
    }
    await $.ajax(packet);
    return ret;
  }

  packetSync(action,data,id=guid()) {
    let packet = server.createSyncPacket(action);
    packet.data = Object.assign(packet.data, data);
    let ret;
    packet.success = function(res) {
      ret = res;
    }
    $.ajax(packet);
    return ret;
  }

  async loadFile(file) {
    let ret;
    await $.ajax({
      type: 'POST',
      url: file,
      data: {},
      success(res) {
        ret=res;
      },
      error(err) {
        console.log(err);
      }
    });
    return ret;
  }

  loadFileSync(file) {
    let ret;
    $.ajax({
      async: false,
      type: 'POST',
      url: file,
      data: {},
      success(res) {
        ret=res;
      },
      error(err) {
        console.log(err);
      }
    });
    return ret;
  }

  async getFile(file) {
    return await server.packet("get_file", {
      file: file
    });
  }

  getFileSync(file) {
    return server.packetSync("get_file", {
      file: file
    });
  }

  async getFiles() {
    return await server.packet("get_files", {});
  }

  getFilesSync() {
    return server.packetSync("get_files", {});
  }

  async sendUpdateChangeFile(file, history) {
    return await server.packet("send_update_change_file", {
      'file': file,
      'content': history,
    });
  }

  sendUpdateChangeFileSync(file, history) {
    return server.packetSync("send_update_change_file", {
      'file': file,
      'content': history,
    });
  }

  async sendUpdateCloseFile(path) {
    return await server.packet("send_update_close_file", {
      'file': path,
    });
  }

  sendUpdateCloseFileSync(path) {
    return server.packetSync("send_update_close_file", {
      'file': path,
    });
  }

  async getOpenedFiles() {
    return await server.packet("list_opened_files", {});
  }

  getOpenedFilesSync() {
    return server.packetSync("list_opened_files", {});
  }

  async getOpenedFile(path) {
    return await server.packet("get_opened_file", {
      'file': path,
    });
  }

  getOpenedFileSync(path) {
    return server.packetSync("get_opened_file", {
      'file': path,
    });
  }

  async saveFile(path, content) {
    return await server.packet("save_file", {
      'file': path,
      'content': content,
    });
  }

  saveFileSync(path, content) {
    return server.packetSync("save_file", {
      'file': path,
      'content': content,
    });
  }
}

const server = new Server();
