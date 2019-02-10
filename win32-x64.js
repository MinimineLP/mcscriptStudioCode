var electronInstaller = require('electron-winstaller');

console.log("Creating WinInstaller win32 x64");
let path = "builds/win32/x64"
resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: `${path}/mcscriptstudiocode-win32-x64`,
  outputDirectory: path,
  authors: 'Minimine',
  exe: 'mcscriptstudiocode.exe',
  setupExe: 'mcscriptstudiocode-win32-x64.exe',
  setupMsi: 'mcscriptstudiocode-win32-x64.msi',
  setupIcon: 'app/assets/icons/icon.ico'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));