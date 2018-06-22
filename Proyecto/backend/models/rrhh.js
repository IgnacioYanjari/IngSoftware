const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const RecursosHumanos = new mongoose.Schema({
  rut : {
    type: String,
    default: '',
    required: true
  },
  empleados : {
    type : Number,
    default : ''
  },
  direccion : {
    type : String,
    default : ''
  }
  sesionId:{
    type: Schema.Type.ObjectId,
    ref: 'Usuarios',
    required : true
  }
  guardiasId : [{
    type: Schema.Type.ObjectId,
    ref: 'Guardias'
  }]
});

module.exports = mongoose.model('RecursosHumanos', RecursosHumanos);
