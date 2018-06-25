const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Guardias = new mongoose.Schema({
  rut:{
    type: String,
    required : true
  },
  direccion : {
    type: String,
    required: true
  },
  jefesGuardiaId : [{
    type: Schema.Types.ObjectId,
    ref : 'JefeGuardias'
  }],
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required : true
  },
  implementosId :[{
    type: Schema.Types.ObjectId,
    ref : 'Implementos'
  }],
  horariosId :[{
    type : Schema.Types.ObjectId,
    ref : 'Horarios'
  }],
  clientesId :[{
    type : Schema.Types.ObjectId,
    ref : 'Clientes'
  }],
  horasTrabajadasId :[{
    type: Schema.Types.ObjectId,
    ref : 'HorasTrabajadas'
  }],
  tipoGuardiaId : {
    type: Schema.Types.ObjectId,
    ref : 'TipoGuardias',
  }
});

module.exports = mongoose.model('Guardias', Guardias);
