@echo off

echo [Compiler] Compiling typescript
cd server
cd src > nul
forfiles /s /m *.ts /c "cmd /c tsc @path" > nul
cd .. > nul
echo [Compiler] Compressing and compiling sass + js
cmd /c gulp all > nul
cd ..
