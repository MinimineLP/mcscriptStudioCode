@echo off
cmd /c cleanplugins
cd plugins
FOR /D %%G in ("*") DO (
	if not exist "%cd%\%%~nxG\versions" mkdir %cd%\%%~nxG\versions
	echo packaging %%~nxG into %cd%\%%~nxG\versions\unknown.zip
	if exist "%cd%\%%~nxG\versions\unknown.zip" del %cd%\%%~nxG\versions\unknown.zip
	set p=\%%~nxG
	cmd /c "C:\Program Files\7-Zip\7z.exe" u %cd%\%%~nxG\versions\unknown.zip %cd%\%%~nxG\* -x!versions -x!versions.json -x!node_modules -x!config.yml -x!package-lock.json -x!gulpfile.js> nul
)
cd ..
