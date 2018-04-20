@echo off
echo start
rd /s /q "./dist"
call ./builds/dynmicbuild.bat
call ./builds/staticbuild.bat
cd dist
call ../builds/installmodules.bat
del /Q /F package*.json
cd ..
echo end