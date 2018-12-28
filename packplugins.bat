@echo off
cmd /c cleanplugins
cd plugins
FOR /D %%G in ("*") DO (
	echo packaging %%~nxG into %cd%\%%~nxG.zip
	if exist "%cd%\%%~nxG.zip" del %cd%\%%~nxG.zip
	cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%\%%~nxG.zip %%~nxG\*>nul
)
cd ..