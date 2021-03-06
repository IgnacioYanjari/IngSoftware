const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Clientes = new mongoose.Schema({
  telefono : {
    type: Number,
    required: true
  },
  nombre : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  localesId:[{
    type: Schema.Types.ObjectId,
    ref: 'Locales'
  }],
  guardiasId : [{
    type: Schema.Types.ObjectId,
    ref: 'Guardias'
  }]
});

module.exports = mongoose.model('Clientes', Clientes);
