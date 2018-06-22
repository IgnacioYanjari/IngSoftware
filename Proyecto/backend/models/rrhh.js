const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const RecursosHumanos = new mongoose.Schema({
  rut : {
    type: String,
    required: true
  },
  empleados : {
    type : Number,
    required : true
  },
  direccion : {
    type : String,
    required : true
  }
  usuarioId: {
    type: Schema.Type.ObjectId,
    ref: 'Usuarios',
    required : true
  },
  guardiasId : [{
    type: Schema.Type.ObjectId,
    ref: 'Guardias'
  }]
});

module.exports = mongoose.model('RecursosHumanos', RecursosHumanos);
