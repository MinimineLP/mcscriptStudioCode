@echo off

echo [Compiler] Compiling typescript
cd server
::cmd /c tsc plugins/keybindings/keybindings.ts
::cmd /c tsc plugins/explorer/explorer.ts
::cmd /c tsc plugins/bar-top/bar-top.ts
::cmd /c tsc plugins/editor/editor.ts
::cmd /c tsc plugins/icons/icons.ts
cmd /c tsc src/index.ts
echo [Compiler] Compressing and compiling sass + js
cmd /c gulp all > nul
cd ..
