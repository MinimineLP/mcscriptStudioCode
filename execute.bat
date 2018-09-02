@echo off
echo [Executor] Executing...
cd C:\Users\Nicolas\Desktop\mcscript\MCScript-Utilitys
start cmd /c node C:\node\projects\mcscriptStudioCode\server\app\index.js
cd C:\node\projects\mcscriptStudioCode\client
start cmd /c npm start
cd ..
