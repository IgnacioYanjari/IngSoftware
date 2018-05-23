const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Para usuarios, datos normales
const UserSchema = new mongoose.Schema({
  rut: {
    type: String,
    default: ''
  },
  email:{
    type: String,
    default: ''
  },
  password :{
    type: String,
    default: ''
  },
  isDeleted :{
    type : Boolean,
    default: false
  },
  typeUser :{
    type: Number,
    default : ''
  }
});

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
}

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password,this.password);
}

module.exports = mongoose.model('User', UserSchema);
