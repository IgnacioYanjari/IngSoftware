
let Usuarios  = require('./usuarios.js'),
  SesionesUsuario = require('./sesionesUsuario.js'),
  Administrador = require('./administrador.js'),
  Clientes = require('./clientes.js'),
  Guardias = require('./guardias.js'),
  Horarios = require('./horarios.js'),
  HorasTrabajadas = require('./horasTrabajadas.js'),
  Implementos = require('./implementos.js'),
  JefeGuardias = require('./jefeGuardias.js'),
  Locales = require('./locales.js'),
  RecursosHumanos = require('./rrhh.js'),
  TipoGuardias = require('./tipoGuardias.js'),
  setup = require('./setup.js');

let models = {}
models.Usuarios = Usuarios;
models.SesionesUsuario = SesionesUsuario;
models.Administrador = Administrador;
models.Clientes = Clientes;
models.Guardias = Guardias;
models.Horarios = Horarios;
models.HorasTrabajadas = HorasTrabajadas;
models.Implementos = Implementos;
models.JefeGuardias = JefeGuardias;
models.Locales = Locales;
models.RecursosHumanos = RecursosHumanos;
models.TipoGuardias = TipoGuardias;

setup(models)

module.exports = models;
