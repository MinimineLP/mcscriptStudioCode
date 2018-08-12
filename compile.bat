@echo off
echo [typescript] compiling typescript
start /min cmd . /k "tsc src/index.ts&exit"
ping 127.0.0.1 -n 6 > nul
gulp all
