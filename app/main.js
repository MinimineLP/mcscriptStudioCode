"use strict";
exports.__esModule = true;
// Modules to control application life and create native browser window
var electron_1 = require("electron");
var fs = require("fs");
var MenuManager_1 = require("./src/scripts/MenuManager");
var menumanager = new MenuManager_1["default"]();
//menumanager.pushItem("File", {label:"Save",accelerator: 'CmdOrCtrl+S'},[0])
//menumanager.pushItem("File", {label:"Save as",accelerator: 'CmdOrCtrl+Shift+S'},[0])
//require('electron-debug')({showDevTools: false}); // Debugs
var icons = __dirname.replace(/\\/g, "/") + "/assets/icons/";
var date = new Date();
if (date.getMonth() == 11)
    icons += "christmas/";
var specialicondifficulty = 100;
var icon = icons + "icon.png";
var appdata = process.env.APPDATA ||
    (process.platform == "darwin"
        ? process.env.HOME + "Library/Preferences"
        : "/var/local");
if (!fs.existsSync(appdata + "/mcscriptStudioCode"))
    fs.mkdirSync(appdata + "/mcscriptStudioCode");
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;
exports.mainWindow = mainWindow;
function createWindow() {
    // Create the browser window.
    exports.mainWindow = mainWindow = new electron_1.BrowserWindow({ width: 800, height: 600, icon: icon });
    menumanager.apply(mainWindow);
    mainWindow.maximize();
    // and load the index.html of the app.
    var menu = electron_1.Menu.getApplicationMenu();
    mainWindow.setMenu(menu);
    mainWindow.loadFile(__dirname + "/index.html");
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    // Emitted when the window is closed.
    mainWindow.on("closed", function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.zzz
        console.log("closed");
        exports.mainWindow = mainWindow = null;
        electron_1.app.quit();
    });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
if (Math.floor(Math.random() * specialicondifficulty) == 0) {
    var files = fs.readdirSync(icons + "special/");
    var index = (Math.random() * files.length) | 0;
    icon = icons + "special/" + files[index];
    console.log("Special icon: " + icon);
}
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.ipcMain.on("get_window", function (event, _arg) {
    event.returnValue = mainWindow;
});
electron_1.ipcMain.on("devtools", function (_event, arg) {
    if (arg == "toggle")
        mainWindow.webContents.toggleDevTools();
    if (arg == "open")
        mainWindow.webContents.openDevTools();
    if (arg == "close")
        mainWindow.webContents.closeDevTools();
});
electron_1.ipcMain.on("get_folder", function (event, arg) {
    if (arg == "get_folder")
        event.returnValue = electron_1.dialog.showOpenDialog({
            properties: ["openFile", "openDirectory", "multiSelections"]
        });
});
electron_1.ipcMain.on("get_icon", function (event) {
    event.returnValue = icon;
});
electron_1.ipcMain.on("", function (event, arg) {
    //@ts-ignore
    event.returnValue = electron_1.dialog.showMessageBox(mainWindow, {
        title: arg,
        buttons: ["ok"]
    });
});
var alertResponse;
electron_1.ipcMain.on("alert", function (event, arg) {
    promptResponse = null;
    var promptWindow = new electron_1.BrowserWindow({
        width: 200,
        height: 100,
        show: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        frame: false
    });
    arg.val = arg.val || "";
    var promptHtml = '<label for="val">' +
        arg +
        "</label>\
  <button onclick=\"require('electron').ipcRenderer.send('prompt-response', 1).value);window.close()\">Ok</button>\
  <button onclick=\"window.close()\">Cancel</button>\
  <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>";
    promptWindow.loadURL("data:text/html," + promptHtml);
    promptWindow.show();
    promptWindow.on("closed", function () {
        event.returnValue = alertResponse;
        promptWindow = null;
    });
});
electron_1.ipcMain.on("alert-response", function (_event, arg) {
    if (arg === "") {
        arg = null;
    }
    promptResponse = arg;
});
var promptResponse;
electron_1.ipcMain.on("prompt", function (event, arg) {
    promptResponse = null;
    var promptWindow = new electron_1.BrowserWindow({
        width: 200,
        height: 100,
        show: false,
        resizable: false,
        movable: false,
        alwaysOnTop: true,
        frame: false
    });
    arg.val = arg.val || "";
    var promptHtml = '<label for="val">' +
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
    promptWindow.on("closed", function () {
        event.returnValue = promptResponse;
        promptWindow = null;
    });
});
electron_1.ipcMain.on("prompt-response", function (_event, arg) {
    if (arg === "") {
        arg = null;
    }
    promptResponse = arg;
});
