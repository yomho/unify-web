@echo off
echo start
rmdir "dist/node_modules"
rd /s /q "./dist"
call ./builds/dynmicbuild.bat
call ./builds/staticbuild.bat
mklink /J "dist/node_modules" "node_modules" 
cd dist
del /Q /F package*.json
cd ..
echo end