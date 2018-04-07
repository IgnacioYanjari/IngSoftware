var express = require('express');
var bodyParser = require('body-parser');
var nexmo = require('./system/nexmo.js');
// Asignamos express() a una variable
var app = express();

// Agregamos ruta '/'
app.get('/', function(req,res){
  res.send('Hello')
});

// Prueba de envio mensaje
const from = "56989628842";
const to = '56989628842';
const text = " SMS de prueba\n";
nexmo.message.sendSms(from,to,text,
  (err, responseData)=>{
    if (err) {
      console.log(err);
    } else {
      console.dir(responseData);
    }
  });

// process.end.PORT se usa como convención dependendiendo de con que se
// ejecuta el servidor.
app.set('port', (process.env.PORT || 5000));

// Usado para no tener que hacer solo objetos anidados
app.use(bodyParser.urlencoded({ extended: false }));

// Dejamos el servidor en escucha
app.listen(app.get('port'), function() {
  console.log('SMS Proxy App listening on port', app.get('port'));
});
