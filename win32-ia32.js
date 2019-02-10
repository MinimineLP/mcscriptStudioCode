var electronInstaller = require('electron-winstaller');

console.log("Creating WinInstaller win32 ia32");
let path = "builds/win32/ia32"
resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: `${path}/mcscriptStudioCode-win32-ia32`,
  outputDirectory: path,
  authors: 'Minimine',
  exe: 'mcscriptstudiocode.exe',
  setupExe: 'mcscriptstudiocode-win32-ia32.exe',
  setupMsi: 'mcscriptstudiocode-win32-ia32.msi',
  setupIcon: 'app/assets/icons/icon.ico',
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));