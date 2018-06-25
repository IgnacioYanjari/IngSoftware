const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Administradores = new mongoose.Schema({
  rut : {
    type: String,
    required: true
  },
  usuarioId:{
    type: Schema.Types.ObjectId,
    ref: 'Usuarios',
    required : true
  }
});

module.exports = mongoose.model('Administradores', Administradores);
