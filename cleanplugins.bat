@echo off
cd plugins
if exist "node_modules" rmdir node_modules /s /q
FOR /D %%G in ("*") DO (
	echo cleaning %%~nxG
	if exist "%%~nxG\node_modules" rmdir %%~nxG\node_modules /s /q
	if exist "%%~nxG\package-lock.json" del %%~nxG\package-lock.json
	if exist "%%~nxG\config.yml" del %%~nxG\config.yml
)
cd ..