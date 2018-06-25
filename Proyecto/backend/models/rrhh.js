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
    default: 0
  },
  direccion : {
    type : String,
    required : true
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required : true
  }
});

module.exports = mongoose.model('RecursosHumanos', RecursosHumanos);
