const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Usuarios = new mongoose.Schema({
  rut: {
    type: String,
    default: '',
    required: true
  },
  email:{
    type: String,
    default: '',
    required: true
  },
  password :{
    type: String,
    default: '',
    required: true
  },
  isDeleted :{
    type : Boolean,
    default: false
  },
  typeUser :{
    type: Number,
    default : '',
    required: true
  }
});

Usuarios.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
}

Usuarios.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('Usuarios', Usuarios);
