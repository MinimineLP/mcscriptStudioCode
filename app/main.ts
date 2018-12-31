// Modules to control application life and create native browser window
import { app, BrowserWindow, dialog, ipcMain, Menu, Event } from "electron";
import * as fs from "fs";
import MenuManager from "./src/scripts/MenuManager";

let menumanager = new MenuManager();
//menumanager.pushItem("File", {label:"Save",accelerator: 'CmdOrCtrl+S'},[0])
//menumanager.pushItem("File", {label:"Save as",accelerator: 'CmdOrCtrl+Shift+S'},[0])

//require('electron-debug')({showDevTools: false}); // Debugs

let icons = __dirname.replace(/\\/g, "/") + "/assets/icons/";
let date: Date = new Date();
if (date.getMonth() == 11) icons += "christmas/";
let specialicondifficulty = 100;
let icon = icons + "icon.png";
let appdata =
  process.env.APPDATA ||
  (process.platform == "darwin"
    ? process.env.HOME + "Library/Preferences"
    : "/var/local");

if (!fs.existsSync(`${appdata}/mcscriptStudioCode`))
  fs.mkdirSync(`${appdata}/mcscriptStudioCode`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, icon: icon });
  menumanager.apply(mainWindow);
  mainWindow.maximize();

  // and load the index.html of the app.
  let menu = Menu.getApplicationMenu();
  mainWindow.setMenu(menu);
  mainWindow.loadFile(__dirname + "/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.zzz
    console.log("closed");
    mainWindow = null;
    app.quit();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

if (Math.floor(Math.random() * specialicondifficulty) == 0) {
  let files = fs.readdirSync(icons + "special/");
  let index = (Math.random() * files.length) | 0;
  icon = icons + "special/" + files[index];
  console.log("Special icon: " + icon);
}

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("get_window", (event: Event, _arg) => {
  event.returnValue = mainWindow;
});

ipcMain.on("devtools", (_event: Event, arg) => {
  if (arg == "toggle") mainWindow.webContents.toggleDevTools();
  if (arg == "open") mainWindow.webContents.openDevTools();
  if (arg == "close") mainWindow.webContents.closeDevTools();
});

ipcMain.on("get_folder", (event: Event, arg) => {
  if (arg == "get_folder")
    event.returnValue = dialog.showOpenDialog({
      properties: ["openFile", "openDirectory", "multiSelections"]
    });
});

ipcMain.on("get_icon", (event: Event) => {
  event.returnValue = icon;
});

ipcMain.on("", (event: Event, arg) => {
  //@ts-ignore
  event.returnValue = dialog.showMessageBox(mainWindow, {
    title: <string>arg,
    buttons: ["ok"]
  });
});

var alertResponse: any;
ipcMain.on("alert", function(event, arg) {
  promptResponse = null;
  var promptWindow = new BrowserWindow({
    width: 200,
    height: 100,
    show: false,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    frame: false
  });
  arg.val = arg.val || "";
  const promptHtml =
    '<label for="val">' +
    arg +
    "</label>\
  <button onclick=\"require('electron').ipcRenderer.send('prompt-response', 1).value);window.close()\">Ok</button>\
  <button onclick=\"window.close()\">Cancel</button>\
  <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>";
  promptWindow.loadURL("data:text/html," + promptHtml);
  promptWindow.show();
  promptWindow.on("closed", function() {
    event.returnValue = alertResponse;
    promptWindow = null;
  });
});
ipcMain.on("alert-response", function(_event, arg) {
  if (arg === "") {
    arg = null;
  }
  promptResponse = arg;
});

var promptResponse: any;
ipcMain.on("prompt", function(event, arg) {
  promptResponse = null;
  var promptWindow = new BrowserWindow({
    width: 200,
    height: 100,
    show: false,
    resizable: false,
    movable: false,
    alwaysOnTop: true,
    frame: false
  });
  arg.val = arg.val || "";
  const promptHtml =
    '<label for="val">' +
    arg.title +
    '</label>\
  <input id="val" value="' +
    arg.val +
    "\" autofocus />\
  <button onclick=\"require('electron').ipcRenderer.send('prompt-response', document.getElementById('val').value);window.close()\">Ok</button>\
  <button onclick=\"window.close()\">Cancel</button>\
  <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>";
  promptWindow.loadURL("data:text/html," + promptHtml);
  promptWindow.show();
  promptWindow.on("closed", function() {
    event.returnValue = promptResponse;
    promptWindow = null;
  });
});
ipcMain.on("prompt-response", function(_event, arg) {
  if (arg === "") {
    arg = null;
  }
  promptResponse = arg;
});

//app.commandLine.appendSwitch('remote-debugging-port', '8315');
//app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');

export { mainWindow };
