const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const TipoGuardias = new mongoose.Schema({
  contrato : {
    type: String,
    default: '',
    required: true
  },
  tipoTurno : {
    type: String,
    default : '',
    required : true
  },
  cantidadTurnos : {
    type : String,
    default : '',
    required : true
  }
  guardiasId :{
    type: Schema.Type.ObjectId,
    ref : 'Guardias',
    required : true
  },
});

module.exports = mongoose.model('TipoGuardias', TipoGuardias);