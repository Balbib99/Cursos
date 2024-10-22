@echo off

@REM Detener el servidor MongoDB
taskkill /F /IM mongod.exe

@REM Detener el servidor de la API
taskkill /F /IM node.exe

@REM Detener MongoDBCompass
taskkill /F /IM MongoDBCompass.exe

@REM Detener Postman
taskkill /F /IM Postman.exe

@echo Servicios detenidos exitosamente.
