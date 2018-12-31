@echo off

echo building linux-ia32 baseapp

if not exist "builds" mkdir builds
if not exist "builds\linux" mkdir builds\linux

if exist "builds\linux\ia32" rmdir builds\linux\ia32
if not exist "builds\linux\ia32" mkdir builds\linux\ia32

set linuxargs=--icon=app/assets/icons/icon.png --prune=true
cmd /c electron-packager app mcscriptStudioCode --overwrite --asar --platform=linux --arch=ia32 --out=builds/linux/ia32 %linuxargs%

cd builds\linux\ia32\mcscriptStudioCode-linux-ia32

echo building linux-ia32 zip download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.zip *>nul

echo building linux-ia32 tar.gz download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%.tar *>nul
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.tar.gz %cd%.tar>nul
del %cd%.tar>nul

cd ..\..\..\..
echo finished building linux-ia32
