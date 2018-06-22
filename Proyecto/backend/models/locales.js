const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Locales = new mongoose.Schema({
  telefono : {
    type: Number,
    required: true
  },
  calle : {
    type : String,
    required : true
  }
  numero : {
    type : Number,
    required : true
  },
  comuna : {
    type : String,
    required : true
  }
  ClienteId:{
    type: Schema.Type.ObjectId,
    ref: 'Clientes',
    required : true
  }
});

module.exports = mongoose.model('Locales', Locales);
