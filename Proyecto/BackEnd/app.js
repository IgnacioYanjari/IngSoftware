var express = require('express');
var bodyParser = require('body-parser');
var nexmo = require('./system/nexmo.js');
var Router = require('./system/router.js');

// Asignamos express() a una variable
var app = express();

// Asignamos rutas
Router(app);

// process.end.PORT se usa como convención dependendiendo de con que se
// ejecuta el servidor.
app.set('port', (process.env.PORT || 5000));

// Usado para no tener que hacer solo objetos anidados
app.use(bodyParser.urlencoded({ extended: false }));

// Prueba de envio mensaje
// const from = "56989628842";
// const to = '56975565910';
// const text = " Te amo muchio amor <3 \n";
// nexmo.message.sendSms(from,to,text,
//   (err, responseData)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(responseData);
//     }
//   });

// Dejamos el servidor en escucha
app.listen(app.get('port'), function() {
  console.log('SMS Proxy App listening on port', app.get('port'));
});
