@echo off
start /min cmd /k "compile&exit"
ping 127.0.0.1 -n 16 > nul
execute
