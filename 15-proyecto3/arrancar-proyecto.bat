@REM Arrancamos el cmd y dentro ejecutamos el servidor de nuestra base de datos
start cmd.exe /k "cd C:\Program Files\MongoDB\Server\7.0\bin && mongod.exe"

@REM Arrancamos el cmd y dentro nos dirigimos a la ruta de nuestro proyecto de api y lo ejecutamos
start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Master_React\api-rest-node && npm start"

@REM Arrancamos el cmd y ejecutamos nuestro proyecto React
start cmd.exe /k "cd C:\Users\balbi\OneDrive\Escritorio\Master_React\15-proyecto3 && npm run dev"

@REM Ejecutamos MongoDBCompass para tener acceso a nuestra base de datos
start C:\Users\balbi\AppData\Local\MongoDBCompass\MongoDBCompass.exe

@REM Ejecutamos Postman para hacer pruebas con la api
start C:\Users\balbi\AppData\Local\Postman\Postman.exe