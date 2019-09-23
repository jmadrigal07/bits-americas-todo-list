# bits-americas-todo-list
todo list

## Dependencias para correr el proyecto:
1. Docker y docker-compose
2. yarn >= 1.13.0
3. nodejs v >= 10

## Para correr el proyecto
cd backend/
```docker-compose up --build -d```

Con el comando anterior iniciaremos una Base de Datos Postgress.

instalación del proyecto (Descarga de los modulos):
```yarn install```

Luego debemos ejecutar las migraciones, para que se creen las tablas bases:
```yarn migrate```

Para correr las pruebas unitarias usamos el comando:
```yarn test```

Para generar la documentación del api ejecutamos el comando:
```yarn documentation```
NOTA: Cuando el servicio este corriendo, se puede ver la documentación en la url: http://<ip>/apidoc/

Por último podemos ejecutar el comando start:
```yarn documentation```

## Babel
Se usa babel para transpilar el código ES6 

## Knex
Se usa esta libreria como interfaz para acceder a la Base de Datos.
