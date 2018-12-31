@echo off
if exist "builds" rmdir /s /q builds
cmd /c build-linux-ia32
::cmd /c build-linux-x64
cmd /c build-win32-ia32
::cmd /c build-win32-x64
