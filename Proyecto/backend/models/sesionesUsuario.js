const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Se usa cuando los usuarios ingresan por diferentes plataformas a la pagina

const SesionUsuario = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref : 'Usuarios',
    required: true
  },
  timestamp:{
    type: Date,
    default: Date.now()
  },
  isDeleted :{
    type : Boolean,
    default: false
  }
});

module.exports = mongoose.model('SesionesUsuario', SesionUsuario);
