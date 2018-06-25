const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Usuarios = new mongoose.Schema({
  rut: {
    type: String,
    required: true
  },
  nombre :{
    type: String,
    required : true
  },
  email:{
    type: String,
    required: true
  },
  contraseña :{
    type: String,
    required: true
  },
  isDeleted :{
    type : Boolean,
    default: false
  },
  typeUser :{
    type: Number,
    required: true
  }
});

Usuarios.methods.generateHash = function(contraseña){
  return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(8),null);
}

Usuarios.methods.validPassword = function(contraseña){
  return bcrypt.compareSync(contraseña,this.contraseña);
}

module.exports = mongoose.model('Usuarios', Usuarios);
