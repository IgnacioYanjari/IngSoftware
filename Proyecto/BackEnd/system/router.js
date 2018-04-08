// Definimos las rutas.
var routes = { get:{}, post:{}, delete:{} ,put:{} };
routes.get['/'] = require('./../modules/main.js');

// Asignamos las rutas
var Router = function(app){
  Object.keys(routes.get).map( (key) => app.get('/' + key , routes.get[key])); // Ruta Get
  Object.keys(routes.post).map( (key) => app.post('/' + key , routes.post[key])); // Ruta Post
  Object.keys(routes.delete).map( (key) => app.delete('/' + key , routes.delete[key])); // Ruta Delete
  Object.keys(routes.put).map( (key) => app.put('/' + key , routes.put[key])); // Ruta Put

  // Ruta desconocida retornar Not Found 404
  app.get('*', (req,res) => res.send('Not Found 404') );
  app.post('*', (req,res) => res.send('Not Found 404') );
  app.delete('*', (req,res) => res.send('Not Found 404') );
  app.put('*', (req,res) => res.send('Not Found 404') );
}

module.exports = Router;
