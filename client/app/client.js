// Modules to control application life and create native browser window
const {app, BrowserWindow, dialog} = require('electron')
const fs = require("fs")
const server = require("mcscriptstudiocodehost");

require('electron-debug')({showDevTools: false}); // Debugs
require("./util.js")
var icon = __dirname + '/assets/images/icon.png';



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

async function createWindow () {

  server["default"](dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}),mcscriptStudioCode.util.address.port);

  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600, maximized: true, icon: icon})

  // and load the index.html of the app.
  mainWindow.setMenu(null);
  mainWindow.maximize();
  mainWindow.loadURL(mcscriptStudioCode.util.address.toString());
  console.log(`Client listening on ${mcscriptStudioCode.util.address}`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    process.exit(0);
  })

  mainWindow.on('close', function () {
    process.exit(0);
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

if(Math.floor(Math.random() * 10)==0) {
  let files = fs.readdirSync(__dirname + '/assets/images/special/');
  let index = Math.floor(Math.random()*(files.length));
  icon =  __dirname + '/assets/images/special/' + files[index];
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
