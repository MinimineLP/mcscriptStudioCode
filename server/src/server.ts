import * as http from 'http';
import * as fs from 'fs';
import * as qs from 'querystring';
import * as os from 'os';
import * as path from 'path';

const lineseperator = os.EOL;

// Working dir
let working_dir:string;

// saves
let savesfilename:string = ".mcscriptStudioCode";
let savesfile:string;
let saves;

// Ignore
let ignorefilename:string = ".mcscriptStudioCodeIgnore";
let ignorefile:string;
let ignore:Array<string>;

let gitignorefilename:string = ".gitignore";
let gitignorefile:string;
let gitignore:Array<string>;

export default class ServerSideApplication {

  constructor(dir) {
    working_dir = dir;
    savesfile = `${working_dir}/${savesfilename}`;
    ignorefile = `${working_dir}/${ignorefilename}`;
    gitignorefile = `${working_dir}/${gitignorefilename}`;
    loadsaves();
    loadIgnore();

    // Watch ignore file
    fs.watchFile(ignorefile, loadIgnore);
  }

  execRequest(request: http.IncomingMessage, response: http.ServerResponse): void {
    try {
      if (request.method == 'POST') {
          var body = '';

          request.on('data', function (data) {
              body += data;

              if (body.length > 1e6)
                  request.connection.destroy();
          });

          request.on('end', function () {
              let req:qs.ParsedUrlQuery = qs.parse(body);

              response.writeHead(200, { 'Content-Type': "application/json" });

              let requestedFile:string;

              switch(req.action) {
                case "get_files":

                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action,
                    working_dir: path.basename(working_dir),
                    files: listFiles(working_dir)
                  }), 'utf-8');
                  break;
                case "get_file":

                  requestedFile = (<string> req.file).replace(/\\/g, "/").replace(/\.\./g, ".");

                  if(requestedFile == null || !fs.existsSync(`${requestedFile}`) || !fs.lstatSync(`${requestedFile}`).isFile()) {

                      // Incorrect action
                      response.writeHead(200, { 'Content-Type': "application/json" });
                      response.end(JSON.stringify({
                        id: req.id,
                        action: req.action,
                        error: {
                          code: "wrong_file",
                          message: "This file does not exist"
                        }
                      }), 'utf-8');
                      return;
                  }

                  let content:string = fs.readFileSync(`${requestedFile}`).toString();
                  let stats:fs.Stats = fs.lstatSync(`${requestedFile}`);

                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action,
                    file: {
                      name: rawName(requestedFile),
                      type: extension(requestedFile),
                      path: requestedFile,
                      fullpath: `${working_dir}/${requestedFile}`,
                      content: content,
                      size: stats.size
                    }
                  }), 'utf-8');
                  break;
                  case "save_file":

                    requestedFile = (<string> req.file).replace(/\\/g, "/").replace(/\.\./g, ".");

                    // Wrong file
                    if(requestedFile == null || !fs.existsSync(`${requestedFile}`) || !fs.lstatSync(`${requestedFile}`).isFile()) {

                      response.writeHead(200, { 'Content-Type': "application/json" });
                      response.end(JSON.stringify({
                        id: req.id,
                        action: req.action,
                        error: {
                          code: "wrong_file",
                          message: "This file does not exist"
                        }
                      }), 'utf-8');
                      return;
                    }
                    fs.writeFileSync(requestedFile,req.content);
                    response.writeHead(200, { 'Content-Type': "application/json" });
                    response.end(JSON.stringify({
                      id: req.id,
                      action: req.action,
                      file: {
                        name: rawName(requestedFile),
                        type: extension(requestedFile),
                        path: requestedFile,
                        content: content,
                        size: fs.lstatSync(`${requestedFile}`).size
                      }
                    }), 'utf-8');

                    break;
                  case "send_update_change_file":

                    requestedFile = (<string> req.file).replace(/\\/g, "/").replace(/\.\./g, ".");

                    // Wrong file
                    if(requestedFile == null || !fs.existsSync(`${working_dir}/${requestedFile}`) || !fs.lstatSync(`${working_dir}/${requestedFile}`).isFile()) {

                      response.writeHead(200, { 'Content-Type': "application/json" });
                      response.end(JSON.stringify({
                        id: req.id,
                        action: req.action,
                        error: {
                          code: "wrong_file",
                          message: "This file does not exist"
                        }
                      }), 'utf-8');
                      return;
                    }

                    content = <string>req.content;

                    if(content == null) {
                      response.writeHead(200, { 'Content-Type': "application/json" });
                      response.end(JSON.stringify({
                        id: req.id,
                        action: req.action,
                        error: {
                          code: "empty_content",
                          message: "Content is empty"
                        }
                      }), 'utf-8');
                      return;
                    }

                    saves.backup.openedFiles[requestedFile] = content;

                    savesaves();

                    response.writeHead(200, { 'Content-Type': "application/json" });
                    response.end(JSON.stringify({
                      id: req.id,
                      action: req.action,
                      file: {
                        name: "unsaved:"+requestedFile.substring(requestedFile.lastIndexOf('/')+1),
                        type: requestedFile.substring(requestedFile.lastIndexOf('.')+1),
                        path: "unsaved:"+requestedFile,
                        fullpath: "unsaved:"+`${working_dir}/${requestedFile}`,
                        content: content,
                      }
                    }), 'utf-8');

                  break;

                case "send_update_close_file":

                  requestedFile = (<string> req.file).replace(/\\/g, "/").replace(/\.\./g, ".");

                  // Wrong file
                  if(!saves.backup.openedFiles[requestedFile]) {

                    response.writeHead(200, { 'Content-Type': "application/json" });
                    response.end(JSON.stringify({
                      id: req.id,
                      action: req.action,
                      error: {
                        code: "file_not_opened",
                        message: "This file is not opened"
                      }
                    }), 'utf-8');
                    return;
                  }

                  delete saves.backup.openedFiles[requestedFile];
                  savesaves();

                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action
                  }), 'utf-8');

                  break;

                case "list_opened_files":

                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action,
                    files: Object.keys(saves.backup.openedFiles),
                  }), 'utf-8');
                  break;

                case "get_opened_file":

                  requestedFile = (<string> req.file).replace(/\\/g, "/").replace(/\.\./g, ".");

                  // Wrong file
                  if(requestedFile == null || !fs.existsSync(`${working_dir}/${requestedFile}`) || !fs.lstatSync(`${working_dir}/${requestedFile}`).isFile()) {

                    response.writeHead(200, { 'Content-Type': "application/json" });
                    response.end(JSON.stringify({
                      id: req.id,
                      action: req.action,
                      error: {
                        code: "wrong_file",
                        message: "This file does not exist",
                      }
                    }), 'utf-8');
                    return;
                  }


                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action,
                    file: requestedFile,
                    content: saves.backup.openedFiles[requestedFile],
                  }), 'utf-8');

                  break;

                default:

                  // Incorrect action
                  response.writeHead(200, { 'Content-Type': "application/json" });
                  response.end(JSON.stringify({
                    id: req.id,
                    action: req.action,
                    error: {
                      code: "wrong_action",
                      message: "This action does not exist"
                    }
                  }), 'utf-8');
                  break;
              }
          });
      }
      else {
        response.writeHead(200, { 'Content-Type': "application/json" });
        response.end(JSON.stringify({
          error: {
            code: "no_post",
            message: "Needing post content"
          }
        }), 'utf-8');
      }
    } catch(e) {

      console.error(e);

      var currentdate = new Date();

      var datestring =  currentdate.getDate() + "."
                      +(currentdate.getMonth()+1)  + "."
                      + currentdate.getFullYear() + " @ "
                      + currentdate.getHours() + ":"
                      + currentdate.getMinutes() + ":"
                      + currentdate.getSeconds();


      var datetime = currentdate.getDate() + "."
                    + (currentdate.getMonth()+1) + "."
                    + currentdate.getFullYear() + "."
                    + currentdate.getHours() + "."
                    + currentdate.getMinutes() + "."
                    + currentdate.getSeconds();


      let exceptionfile = __dirname + "/../crashes/"+datetime+".log"

      fs.writeFileSync(exceptionfile,`created at ${datestring}\n\n${e}\n${e.stack}`);

      response.writeHead(200, { 'Content-Type': "application/json" });
      response.end(JSON.stringify({
        exception: {
          exception: e,
          message: "Exception occured while executing request: " + e + ". Please repost this bug <a href=https://github.com/miniminelp/mcscriptStudioCode/issues>here</a>. Full log here: "+exceptionfile,
        }
      }), 'utf-8');
    }
  }
}

function listFiles(directory:string): any {

  if(fs.lstatSync(directory).isDirectory()) {

    let ret: Object = {};
    let files = fs.readdirSync(directory);

    for (var i = 0; i < files.length; i++) {
      ret[files[i]] = listFiles(`${directory}/${files[i]}`);
    }

    ret = removeIgnoredFromList(ret);

    return ret;

  } else return directory;
}

function removeIgnoredFromList(ret:any):any {
  let ignored = ignore.concat(gitignore);

  for(let i=0;i<ignored.length;i++) {
    let act:string = ignored[i];
    act = act.replace(/(\r|\n)|(^( |\t)*)|(( |\t)*$)|/g, "");
    if(/^\/.*\/$/.test(act)) {
      act = act.replace(/^\//,"").replace(/\/$/,"");
    } else {
      act = "^\\/" + act.replace(/\\/, "\\\\")
                        .replace(/\./, "\\.")
                        .replace(/\[/, "\\[")
                        .replace(/\]/, "\\]")
                        .replace(/\(/, "\\]")
                        .replace(/\)/, "\\]")
                        .replace(/\{/, "\\]")
                        .replace(/\}/, "\\]")
                        .replace(/\*/, ".*")
                        .replace(/\//, "\\/")
                        .replace(/\^/, "\\^")
                        .replace(/\$/, "\\$")
                        .replace(/\?/, "\\?")
                        .replace(/\+/, "\\+")
                        .replace(/\=/, "\\=")
                        .replace(/\|/, "\\|")
                        .replace(/\,/, "\\,")
                        .replace(/\=/, "\\=")
                        .replace(/\=/, "\\=");
        act += "$";
    }

    let filter = new RegExp(act);

    let f = function(path,obj): any {
      for(let k in obj) {
        let p = path + "/" + k;
        if(filter.test(p)) {
          delete obj[k];
        }
        else {
          if(obj[p] instanceof Object)obj[p] = f(p,obj[p]);
        }
      }
      return obj;
    }
    ret = f("",ret);
  }
  return ret;
}

function savesaves() {
  fs.writeFileSync(savesfile, JSON.stringify(saves));
}

function loadsaves() {
  if(fs.existsSync(savesfile)) saves = JSON.parse(fs.readFileSync(savesfile).toString());
  else saves = {backup: {openedFiles: {}}};
  savesaves();
}

function saveIgnore() {
  fs.writeFileSync(ignorefile, ignore.join(lineseperator));
}

function loadIgnore() {
  if(fs.existsSync(ignorefile)) ignore = fs.readFileSync(ignorefile).toString().replace(/\r/g, "").split("\n");
  else ignore = [ignorefilename,savesfilename];

  saveIgnore();

  // load git ignore
  if(fs.existsSync(gitignorefile)) gitignore = fs.readFileSync(gitignorefile).toString().replace(/\r/g, "").split("\n");
  else gitignore = [];
}

function rawName(path) {
  path = path.replace(/\\/g, "/");
  return path.substring(path.lastIndexOf('/')+1);
}

function extension(path) {
  return path.substring(path.lastIndexOf('.')+1);
}
