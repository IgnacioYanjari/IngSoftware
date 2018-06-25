const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const JefeGuardias = new mongoose.Schema({
  rut : {
    type: String,
    required: true
  },
  usuarioId:{
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required : true
  },
  implementosId :[{
    type: Schema.Types.ObjectId,
    ref : 'Implementos'
  }],
  guardiasId : [{
    type: Schema.Types.ObjectId,
    ref: 'Guardias'
  }]
});

module.exports = mongoose.model('JefeGuardias', JefeGuardias);
