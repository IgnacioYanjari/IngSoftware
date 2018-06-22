const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Guardias = new mongoose.Schema({
  rut:{
    type: String,
    required : true
  }
  direccion : {
    type: String,
    required: true
  },
  jefesGuardiaId : [{
    type: Schema.Type.ObjectId,
    ref : 'JefeGuardias'
  }],
  usuarioId: {
    type: Schema.Type.ObjectId,
    ref: 'Usuarios',
    required : true
  },
  implementosId :[{
    type: Schema.Type.ObjectId,
    ref : 'Implementos'
  }],
  horariosId :[{
    type : Schema.Type.ObjectId,
    ref : 'Horarios'
  }],
  clientesId :[{
    type : Schema.Type.ObjectId,
    ref : 'Clientes'
  }],
  horasTrabajadasId :[{
    type: Schema.type.ObjectId,
    ref : 'HorasTrabajadas'
  }],
  tipoGuardiasId : {
    type: Schema.type.ObjectId,
    ref : 'TiposGuaridas'
  }

});

module.exports = mongoose.model('Guardias', Guardias);
