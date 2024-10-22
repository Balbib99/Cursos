@REM Arrancamos el cmd y dentro ejecutamos el servidor de nuestra base de datos
start cmd.exe /k "cd C:\Program Files\MongoDB\Server\7.0\bin && mongod.exe"

@REM Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto de api y lo ejecutamos
start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Master_React\api-rest-red-social && npm start"

@REM @REM Arrancamos el cmd y ejecutamos nuestro proyecto React
@REM start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Master_React\15-proyecto3 && npm run dev"

@REM @REM Ejecutamos MongoDBCompass para tener acceso a nuestra base de datos
@REM start C:\Users\balbi\AppData\Local\MongoDBCompass\MongoDBCompass.exe

@REM @REM Ejecutamos Postman para hacer pruebas con la api
@REM start C:\Users\balbi\AppData\Local\Postman\Postman.exe