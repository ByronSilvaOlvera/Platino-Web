### Peluqueria Store

## API
Inicar el server
````
npm install
npm run dev
````

Test
````
npm test
````
Utiliza express MongoDb<br> 
Creo 4 Modelo Cliente, Cita, Atencion, Servicio cada modelo tiene el CRUD completo. <br>
Apunta la pueto 8089<br>
````
url: http://localhost:8092/peluqueria/api
rutacomponente: /cliente/
metodo: /all/page/:num/ | /add/ | /edit/:id/ | /one/:id/ | /delete/:id/
````
Metodos<br>
POST: http://localhost:8092/peluqueria/api/cliente/add/ HTTP/1.1 
<br>
````
{
    "nombres"       : "Eduardo",
    "apellidos"     : "Carpa",
    "identificacion": "0888888888",
    "telefono"      : "0987230279",
    "email"         : "eduardo@gmail.com",
    "direccion"     : "floridas",
    "fechanacio"    : "1987-07-12"
}
````
GET: http://localhost:8092/peluqueria/api/cliente/all/page/1/ HTTP/1.1<br>
GET: http://localhost:8092/peluqueria/api/cliente/one/60eff8f6cb2fbf44e8d04eda/ HTTP/1.1<br>
PUT: http://localhost:8092/peluqueria/api/cliente/edit/60ee8a1bb98a932cb04c7543/ HTTP/1.1<br>
````
{
    "nombres": "Edwin Pedrihno",
    "apellidos": "Olvera Pazmino"
}
````
DELETE: http://localhost:8092/peluqueria/api/cliente/delete/60f79b8680cf0a80201c791a/ HTTP/1.1<br>  



## WEB APP

Inicar la APP
````
npm install
ng serve
````
App
<img src="app.png" alt="Italian Trulli">

### Web app Opciones
<img src="create.png" alt="Italian Trulli">