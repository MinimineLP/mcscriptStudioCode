@echo off
if exist "builds" rmdir /s /q builds
build-linux-ia32
build-linux-x64
build-win32-ia32
build-win32-x64
