declare class ShortcutbarAPI {
  id: string;
  server: ServerApi;
  constructor(server: ServerApi);
  addButton(id: string, name: string, icon: string, onclick: any);
}
declare let working_dir: string;

import * as SimpleRcon from "simple-rcon";
import * as Fs from "fs";
import * as Os from "os";
import * as ChildProcess from "child_process";
import * as Node_Console from "console";
import * as Path from "path";
import * as $ from "jquery";
import * as swal from "sweetalert";
import { DivConsole } from "./scripts/DivConsole";
import { Config, FileFormatters } from "@mcscriptstudiocode/config";
import { ServerApi, Plugin, guid } from "@mcscriptstudiocode/pluginmanager";

let divconsole = new DivConsole();
const tmp = __dirname + "/temp";
let config: Config;

export default class Testserver extends Plugin {
  server: ServerApi;
  mcserver: Server = null;
  hasActiveServer: Function;

  setup(server: ServerApi) {
    this.server = server;
    server.addElement(Fs.readFileSync(`${__dirname}/console.html`, "utf8"));
    server.addStylesheet(`${__dirname}/css/testserver.min.css`);
    if (Fs.existsSync(tmp)) deleteFolderRecursive(tmp);
  }

  start(server: ServerApi) {
    this.server = server;

    config = new Config(`${__dirname}/config.yml`, FileFormatters.Yaml);
    loadConfig();
    setupDrag();

    divconsole.pipe(console.log);
    divconsole.pipe(document.getElementById("testservercontent"));

    if (!Fs.existsSync(tmp)) Fs.mkdirSync(tmp);

    let api: ShortcutbarAPI = server.getAPI("shortcutbar");
    let activeserver = false;
    let mcserver = this.mcserver;
    let id: string;

    $("#testserverform").submit(event => {
      event.preventDefault();
      let command: string = <string>$("#testserverinput").val();
      $("#testserverinput").val("");
      if (activeserver) {
        divconsole.log(`> ${command}`);
        mcserver.execCommand(command, function() {});
      }
      return false;
    });

    api.addButton(
      "start_testserver",
      "testserver",
      `<i class="mdi mdi-server-plus"></i>`,
      () => {
        if (!activeserver) {
          let jar = config.get("server.jar");
          if (!Fs.existsSync(jar)) {
            //@ts-ignore
            swal(
              "Jar not found",
              `Please enter  valid jar into the Testserver config (point: server.jar)!`,
              "error"
            );
            return;
          }
          divconsole.log("starting server...");
          $("#testserver").show();
          activeserver = true;
          id = guid();
          Fs.mkdirSync(`${tmp}/${id}`);
          Fs.mkdirSync(`${tmp}/${id}/world`);
          Fs.mkdirSync(`${tmp}/${id}/world/datapacks`);
          Fs.writeFileSync(`${tmp}/${id}/eula.txt`, "eula=true", "utf8");
          Fs.writeFileSync(
            `${tmp}/${id}/server.properties`,
            `server-name=Testserver${
              Os.EOL
            }generator-settings=3;minecraft\:bedrock,40*minecraft\:stone,4*minecraft\:dirt,minecraft\:grass;1${
              Os.EOL
            }level-type=FLAT${Os.EOL}enable-command-block=true${
              Os.EOL
            }max-players=4${Os.EOL}server-port=25565${Os.EOL}debug=false${
              Os.EOL
            }enable-rcon=true${Os.EOL}rcon.port=25575${
              Os.EOL
            }rcon.password=${id}${
              Os.EOL
            }motd=§4MCScriptStudioCode §3Testserver§r`,
            "utf8"
          );

          walkSync(working_dir).forEach((p: string) => {
            let filename: string = Path.basename(p);
            if (filename.toLowerCase() == "pack.mcmeta") {
              if (Fs.readdirSync(Path.dirname(p)).includes("data"))
                copyFolderRecursiveSync(
                  Path.dirname(p),
                  `${tmp}/${id}/world/datapacks`
                );
            }
          });

          let server: Server = new Server(jar, `${tmp}/${id}/`, id);
          server.start();
          this.mcserver = server;
          mcserver = server;
        } else {
          deleteFolderRecursive(`${tmp}/${id}/world/datapacks`);
          Fs.mkdirSync(`${tmp}/${id}/world/datapacks`);
          walkSync(working_dir).forEach((p: string) => {
            let filename: string = Path.basename(p);
            if (filename.toLowerCase() == "pack.mcmeta") {
              if (Fs.readdirSync(Path.dirname(p)).includes("data"))
                copyFolderRecursiveSync(
                  Path.dirname(p),
                  `${tmp}/${id}/world/datapacks`
                );
            }
          });
          this.mcserver.reload();
        }
      }
    );

    api.addButton(
      "stop_testserver",
      "stop testserver",
      `<i class="mdi mdi-server-minus"></i>`,
      () => {
        $("#testserver").hide();
        $("#testservercontent").empty();
        $("#testserverinput").val("");
        if (activeserver) {
          mcserver.stop();
          activeserver = false;
        }
      }
    );

    $("#testserverreload").click(() => {
      if (activeserver) {
        deleteFolderRecursive(`${tmp}/${id}/world/datapacks`);
        Fs.mkdirSync(`${tmp}/${id}/world/datapacks`);
        walkSync(working_dir).forEach((p: string) => {
          let filename: string = Path.basename(p);
          if (filename.toLowerCase() == "pack.mcmeta") {
            if (Fs.readdirSync(Path.dirname(p)).includes("data"))
              copyFolderRecursiveSync(
                Path.dirname(p),
                `${tmp}/${id}/world/datapacks`
              );
          }
        });
        this.mcserver.reload();
      }
    });

    let minimized = false;

    $("#testserverminimize").click(() => {
      if (!minimized) {
        $("#testserver").animate(
          {
            height: "19px"
          },
          300,
          () => {
            $("#testserver").animate(
              {
                width: "19px",
                left: `+=${$(window).width() - 300}px`
              },
              300,
              function() {
                $("#testservericons")
                  .children("i")
                  .not("#testserverminimize")
                  .hide();
                $("#testservername").hide();
                $("#testserverminimize").removeClass("mdi-window-minimize");
                $("#testserverminimize").addClass("mdi-server");
                $("#testserverform").hide();
                minimized = true;
              }
            );
          }
        );
      } else {
        $("#testservericons")
          .children("i")
          .show();
        $("#testservername").show();
        $("#testserverminimize").addClass("mdi-window-minimize");
        $("#testserverminimize").removeClass("mdi-server");
        $("#testserverform").show();
        $("#testserver").animate(
          {
            width: `${$(window).width() - 300}px`,
            left: `-=${$(window).width() - 300}px`
          },
          300,
          () => {
            $("#testserver").animate(
              {
                height: "420px"
              },
              300,
              function() {
                minimized = false;
              }
            );
          }
        );
      }
    });

    $("#testserverstop").click(() => {
      $("#testserver").hide();
      $("#testservercontent").empty();
      $("#testserverinput").val("");
      if (activeserver) {
        mcserver.stop();
        activeserver = false;
      }
    });

    Fs.watch(working_dir, (...args: string[]) => {
      let important: boolean = false;
      if (
        args[1].endsWith(".mcfunction") ||
        args[1].endsWith(".mcmeta") ||
        args[1].endsWith(".json")
      )
        important = true;
      if (args[0] == "rename") important = true;
      if (config.get("autoreload") && activeserver && important) {
        deleteFolderRecursive(`${tmp}/${id}/world/datapacks`);
        Fs.mkdirSync(`${tmp}/${id}/world/datapacks`);
        walkSync(working_dir).forEach((p: string) => {
          let filename: string = Path.basename(p);
          if (filename.toLowerCase() == "pack.mcmeta") {
            if (Fs.readdirSync(Path.dirname(p)).includes("data"))
              copyFolderRecursiveSync(
                Path.dirname(p),
                `${tmp}/${id}/world/datapacks`
              );
          }
        });

        mcserver.reload();
      }
    });
    this.hasActiveServer = function() {
      return activeserver;
    };
  }

  stop(server: ServerApi) {
    this.server = server;
    if (this.hasActiveServer()) this.mcserver.stop();
    if (Fs.existsSync(tmp)) deleteFolderRecursive(tmp);
  }

  reload(server: ServerApi) {
    this.server = server;
    if (this.mcserver != null) this.mcserver.stop();
    if (Fs.existsSync(tmp)) deleteFolderRecursive(tmp);
    if (!Fs.existsSync(tmp)) Fs.mkdirSync(tmp);
  }
}
function deleteFolderRecursive(path: Fs.PathLike) {
  if (Fs.existsSync(path)) {
    Fs.readdirSync(path).forEach(function(file) {
      var curPath = path + "/" + file;
      if (Fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        Fs.unlinkSync(curPath);
      }
    });
    Fs.rmdirSync(path);
  }
}

class Server {
  spawn: ChildProcess.ChildProcess;
  jar: string;
  working_dir: string;
  queue: any[];
  rcon: any;
  state: string;
  password: string;

  constructor(jar: string, working_dir: string, password: string) {
    this.working_dir = working_dir;
    this.jar = jar;
    this.password = password;
    process.on("exit", () => this.stop());
  }
  stop() {
    Node_Console.log("stopping...");
    let rcon = this.rcon;
    rcon.connect();
    rcon.exec("stop", function(res: any) {
      Node_Console.log(res);
      rcon.close();
    });
  }
  start() {
    if (this.spawn) throw new Error("Server already started");

    let javaargs = [
      "-jar",
      "-Xms" + config.get("server.minram"),
      "-Xmx" + config.get("server.maxram")
    ];
    let args = ["nogui"];
    this.spawn = ChildProcess.exec(
      config.get("javacommand") +
        " " +
        javaargs.join(" ") +
        " " +
        this.jar.replace(/\\/g, "/") +
        " " +
        args.join(" "),
      { cwd: this.working_dir }
    );
    this.spawn.stdout.pipe(process.stdout);
    this.spawn.stderr.pipe(process.stderr);

    this.spawn.stdout.pipe(divconsole.outStream);
    this.spawn.stderr.pipe(divconsole.errorStream);
    process.stdin.pipe(this.spawn.stdin);

    this.queue = [];

    this.rcon = new SimpleRcon({
      host: "localhost",
      port: 25575,
      password: this.password,
      timeout: 0
    });
    this.rcon.on("authenticated", () => {
      Node_Console.log("rcon authenticated");
      this.state = "connected";
    });
    this.rcon.on("disconnected", () => {
      Node_Console.log("rcon disconnected");
      this.state = "disconnected";
    });
    this.rcon.on("error", err => {
      Node_Console.error(err);
    });
  }
  reload() {
    let rcon = this.rcon;
    rcon.connect();
    rcon.exec("reload", function(res: any) {
      Node_Console.log(res);
    });
  }
  execCommand(
    cmd: string,
    callback: Function = function(res: any) {
      Node_Console.log(res);
    }
  ) {
    let rcon = this.rcon;
    rcon.connect();
    rcon.exec(cmd, function(res: any) {
      Node_Console.log(res);
    });
  }
}

function walkSync(path: string): string[] {
  path = path.replace(/\\/g, "/");
  let ret: string[] = [];
  if (Fs.lstatSync(path).isFile()) return [path];
  Fs.readdirSync(path).forEach(e => {
    ret = ret.concat(walkSync(path + "/" + e));
  });
  return ret;
}

function copyFileSync(source, target) {
  var targetFile = target;
  if (Fs.existsSync(target)) {
    if (Fs.lstatSync(target).isDirectory()) {
      targetFile = Path.join(target, Path.basename(source));
    }
  }
  Fs.writeFileSync(targetFile, Fs.readFileSync(source));
}

function copyFolderRecursiveSync(
  source: string,
  target: string,
  useOldName: boolean = true
) {
  var files = [];
  var targetFolder = target;
  if (useOldName) targetFolder = Path.join(target, Path.basename(source));
  if (!Fs.existsSync(targetFolder)) {
    Fs.mkdirSync(targetFolder);
  }
  if (Fs.lstatSync(source).isDirectory()) {
    files = Fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = Path.join(source, file);
      if (Fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

function setupDrag() {
  dragElement(document.getElementById("testserver"));

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let header;
    if (document.getElementById(elmnt.id + "header")) {
      header = document.getElementById(elmnt.id + "header");
      header.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      header = elmnt;
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      let x = elmnt.offsetLeft - pos1;
      let y = elmnt.offsetTop - pos2;
      if (x < 1) x = 1;
      if (y < 1) y = 1;
      if (x + $(elmnt).width() > $(window).width())
        x = $(window).width() - $(elmnt).width();
      if (y + $(header).height() * 2 > $(window).height())
        y = $(window).height() - $(header).height() * 2;
      elmnt.style.left = x + "px";
      elmnt.style.top = y + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}

function loadConfig() {
  config.load();
  config.setStandart("autoreload", true);
  config.setStandart("javacommand", "java");
  config.setStandart("server.jar", "server.jar");
  config.setStandart("server.maxram", "2048M");
  config.setStandart("server.minram", "512M");
  config.save();
}
