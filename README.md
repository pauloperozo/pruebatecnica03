# Ranking de repositorios de GitHub 📊

Esta API permite obtener la data de los repositorios con más estrellas del siguiente repositorio ``https://github.com/EvanLi/Github-Ranking``.
Para realizar esta tarea se utilizan las librerías ``axios`` y ``@octokit/rest``.
Se compone en esencia de tres rutas, cuyo controlador es el archivo ``repository.js``, sus funciones son las siguientes:
    - Permite obtener el listado de fechas en que existen repositorios 📅.
    - Permite obtener el top X para un lenguaje de programación 🌟.
    - Permite descargar la información solicitada en un archivo de CSV (para ello se implementa la librería csvtojson) 📥.

## Variables de entorno
En el archivo ``.env``se encuentran las variables de entorno que a saber son:

  * HOST=localhost
  * PORT=3000 (puerto en que correra el servicio)
  * TIMEOUT=7000 (tiempo máximo de espera por una petición)
  * OWNER=EvanLi (propietario del repositorio a consultar)
  * REPO=Github-Ranking (repositorio a consultar)
  * REPO_PATH=Data (path del repositorio a consultar)


## Construido con 🛠️

* [Nodejs](https://nodejs.org) - Entorno de ejecuciónJS.
* [Express](https://expressjs.com/es/) - Framework de nodejs utilizado ES6.
* [npm](https://www.npmjs.com/) - Permite instalar diversas librerías utilizadas en el proyecto.

## Pre-requisitos 📋

_Necesitas instalar lo siguiente:_ ⚠️

* Instala Nodejs

## Deploy 🚀
_Ejecuta los siguientes pasos en orden:_

### Paso 1 Clona el repositorio: 

  ```$ git clone https://github.com/pauloperozo/pruebatecnica03``` ⏬

### Paso 2 Entra a la carpeta y ejecuta el siquiente comando: 

  ```$ npm install``` 📂	

Ya con estos dos pasos se tiene el código del proyecto y se instalan las dependencias.

### Paso 3 Runner del proyecto:

   ```$ npm run start``` 
Con este comando se inicia el servicio.


## Pruebas 🚥

Los test se desarrollaron utilizando jest y supertest (se encuentran en dependencias de desarrollo)
Para ejecutar las pruebas, sólo debes utilizar el comando ``npm run test``` ✅.

## Resulado Final 🚥

En el directorio examples contendra unos captures de pantalla, mostrando el resultado final, al iniciar los servicios anteriormente mencionados.

## Autor ✒️

* **Paulo Perozo** - (#des_paulo) 👤.