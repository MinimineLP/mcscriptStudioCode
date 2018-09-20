const {app, BrowserWindow, dialog} = require('electron')
const fs = require("fs")
const server = require("mcscriptstudiocodehost");

require('electron-debug')({showDevTools: false}); // Debugs
require("./util.js")
let icon = __dirname + '/assets/icons/icon.png';
let appdata = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local');

if(!fs.existsSync(`${appdata}/mcscriptStudioCode`))fs.mkdirSync(`${appdata}/mcscriptStudioCode`);

console.log(`${appdata}/mcscriptStudioCode`)

let mainWindow

async function createWindow () {

  mainWindow = new BrowserWindow({width: 800, height: 600, maximized: true, icon: icon});
  let res = server.startServer(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}),mcscriptStudioCode.util.address.port,false);
  res.manager.loadPlugins(`${appdata}/mcscriptStudioCode/plugins`);
  res.manager.setupPlugins();
  res.manager.startPlugins();
  server.SiteAPI.loadSite({host: "raw.githubusercontent.com", path: '/MinimineLP/MCScriptStudioCode-core-plugins/master/plugins-core.json', protocoll: 'https'}, function(ret) {
    for(let url of JSON.parse(ret)) res.manager.installPlugin(url,`${appdata}/mcscriptStudioCode/plugins`);
  });

  mainWindow.setMenu(null);
  mainWindow.maximize();
  mainWindow.loadURL(mcscriptStudioCode.util.address.toString());
  console.log(`Client listening on ${mcscriptStudioCode.util.address}`)

  mainWindow.on('closed', function () {
    process.exit(0);
  })

  mainWindow.on('close', function () {
    process.exit(0);
  })
}

app.on('ready', createWindow)

if(Math.floor(Math.random() * 10)==0) {
  let files = fs.readdirSync(__dirname + '/assets/icons/special/');
  let index = Math.floor(Math.random()*(files.length));
  icon =  __dirname + '/assets/icons/special/' + files[index];
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
