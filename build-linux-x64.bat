@echo off

echo building linux-x64 baseapp

if not exist "builds" mkdir builds
if not exist "builds\linux" mkdir builds\linux

if exist "builds\linux\x64" rmdir builds\linux\x64
if not exist "builds\linux\x64" mkdir builds\linux\x64

set linuxargs=--icon=app/assets/icons/icon.png --prune=true
cmd /c electron-packager app mcscriptStudioCode --overwrite --asar --platform=linux --arch=x64 --out=builds/linux/x64 %linuxargs%

cd builds\linux\x64\mcscriptStudioCode-linux-x64

echo building linux-x64 zip download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.zip *>nul

echo building linux-x64 tar.gz download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%.tar *>nul
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.tar.gz %cd%.tar>nul
del %cd%.tar>nul

cd ..\..\..\..\..
echo finished building linux-x64
