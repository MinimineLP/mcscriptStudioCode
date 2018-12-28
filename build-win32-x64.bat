@echo off

echo building win32-x64 baseapp

if not exist "builds" mkdir builds
if not exist "builds\win32" mkdir builds\win32

if exist "builds\win32\x64" rmdir builds\win32\x64
if not exist "builds\win32\x64" mkdir builds\win32\x64

set win32args=--icon=app/assets/icons/icon.ico --prune=true --version-string.CompanyName=Minimine --version-string.FileDescription="mcscriptStudioCode editor for mcscript (https://github.com/stevertus/mcscript)" --version-string.ProductName="mcscriptStudioCode"
cmd /c electron-packager app mcscriptStudioCode --overwrite --asar --platform=win32 --arch=x64 --out=builds/win32/x64 %win32args%

cd builds\win32\x64\mcscriptStudioCode-win32-x64

echo building win32-x64 zip download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.zip *>nul

echo building win32-x64 tar.gz download
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%.tar *>nul
cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%-portable.tar.gz %cd%.tar>nul
del %cd%.tar>nul

cd ..\..\..\..\..

echo building win32-x64 installer
cmd /c node win32-x64.js

echo finished building win32-x64
