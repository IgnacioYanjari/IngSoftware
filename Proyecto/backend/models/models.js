
var Usuarios  = require('./usuarios.js'),
  SesionesUsuario = require('./sesionesUsuario.js');

let models = {}
models.Usuarios = Usuarios;
models.SesionesUsuario = SesionesUsuario;

module.exports = models;
