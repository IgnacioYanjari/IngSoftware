const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const TipoGuardias = new mongoose.Schema({
  contrato : {
    type: String,
    required: true
  },
  tipoTurno : {
    type: String,
    default:'5x2'
  },
  cantidadTurnos : {
    type : Number,
    default : 0
  },
  guardiasId :{
    type: Schema.Types.ObjectId,
    ref : 'Guardias',
    required : true
  },
});

module.exports = mongoose.model('TipoGuardias', TipoGuardias);
