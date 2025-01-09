# Bienvenido al coding-interview-backend-level-3

## Descripción
Este proyecto es una API REST que permite realizar operaciones CRUD sobre una entidad de tipo `Item`.

La entidad tiene 3 campos: `id`, `name` y `price`.

Tu tarea es completar la implementación de toda la funcionalidad de forma tal de que los tests e2e pasen exitosamente.

## Solución:
El reto se realizó usando el framework que ya estaba propuesto, **happi**, adicional se usó **MySQL** para la base de datos y se hace uso de la librería **TypeORM** como ORM, se implementó también **Docker** para poder iniciarlo a nivel de un ambiente productivo. 

Este proyecto ha sido desarrollado por **Cristian Andres Fajardo https://www.linkedin.com/in/andresf123/**

## Instrucciones para su uso: 

### Prerrequisitos: 
- Node js
- MySQL
- Docker, se usará al compilarlo en modo productivo, por lo que será necesario también tener esto instalado en el sistema

### Antes de iniciar: 
Antes de iniciar es necesario tener en cuenta las siguientes recomendaciones:

- Ejecutar el script de MySQL almacenado en `./init.sql`, este script contiene la creación de las BD para el proyecto y una BD de test
- El archivo `.test.env` contiene las variables de entorno para ejecutar el ambiente de test (el que se usara para realizar las pruebas unitarias) no se recomienda cambiar los valores de este archivo
- Es necesario agregar un archivo `.env` con la configuración deseada para ejecutar el proyecto en local. El archivo que se usó como ejemplo será compartido por correo al momento de entregar este proyecto, también puede crear su propio archivo a base del archivo `.test.env`

### Ejecutando en local: 
- Ejecutar el comando `npm run execute:migration` para poder correr las migraciones pendientes del ORM, en este caso la creación de las tablas necesarias para el correcto funcionamiento de la aplicación.
- Ejecutar el comando `npm run start:dev`, esto iniciará el proyecto, podrá hacer uso de los EPs expuestos, usando la url `http://localhost:3000`, puede realizar el consumo del EP `http://localhost:3000/ping` para saber que el sistema está funcionando correctamente

**Nota:** Es necesario haber ejecutado el script `./init.sql` en el servidor de `MySQL` antes de ejecutar la migración.
  
### Ejecutando las pruebas: 
- Ejecutar el comando `npm run test` para poder iniciar los test 
- No se necesita ejecutar la migración porque la app está configurada para que, si está en ambiente de **test** sincronice automáticamente los cambios en las entidades

**Nota:** Es necesario haber ejecutado el script `./init.sql` en el servidor de `MySQL` antes de ejecutar el test

### Ejecutando en modo productivo: 
Este modo usa **Docker** para poder desplegar la aplicación en un ambiente productivo, es necesario tener `Docker` instalado en el sistema. La compilación de **Docker**, instalará en el sistema 2 imágenes, la primera correspondiente a una instancia de **MySQL** y otra con lo necesario para la aplicación de **Node**. El contenedor de **MySQL** se podrá acceder a través del puerto **3307** desde la máquina anfitrión.

- Ejecutar el comando `npm run build:prod`, esto realizará la compilación del proyecto en modo productivo y copiará lo necesario para su correcto funcionamiento, la información necesaria se encontrará en la carpeta `dist`.
- En la terminal moverse a la carpeta `dist`.
- Ejecutar el comando `docker compose up --detach`, esto creará las imágenes necesarias y ejecutará el servicio.
- Después de aproximadamente 2 minutos, puede empezar a llamar el EP `http://localhost:3000/ping` para saber que el sistema está funcionando correctamente.
- Ejecutar el script `docker exec -i el_dorado_challenge_service npm run execute:migration:prod` para correr las migraciones pendientes.
- ¡Disfrutar! =D

**Nota:** En este modo NO es necesario ejecutar el script `./init.sql`, ya que esto hace parte de las configuraciones que realiza **Docker** al compilarlo. También es necesario que, antes de ejecutar esto, exista un archivo `.env` que se usará como base para la ejecución de la aplicación.

### Que puedes hacer: 
- ✅ Modificar el código fuente y agregar nuevas clases, métodos, campos, etc.
- ✅ Cambiar dependencias, agregar nuevas, etc.
- ✅ Modificar la estructura del proyecto (/src/** es todo tuyo)
- ✅ Elegir una base de datos
- ✅ Elegir un framework web
- ✅ Cambiar la definición del .devContainer


### Que **no** puedes hacer:
- ❌ No puedes modificar el archivo original /e2e/index.test.ts (pero puedes crear otros e2e test si lo deseas)
- ❌ El proyecto debe usar Typescript 
- ❌ Estresarte 🤗


## Pasos para comenzar
1. Haz un fork usando este repositorio como template
2. Clona el repositorio en tu máquina
3. Realiza los cambios necesarios para que los tests pasen
4. Sube tus cambios a tu repositorio
5. Avísanos que has terminado
6. ???
7. PROFIT

### Cualquier duda contactarme a https://www.linkedin.com/in/andreujuan/
