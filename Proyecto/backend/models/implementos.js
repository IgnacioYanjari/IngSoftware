const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Implementos = new mongoose.Schema({
  nombre : {
    type: String,
    required : true
  },
  tipo:{
    type: String,
    required : true
  },
  cantidad :{
    type: Number,
    required : true
  },
  detalles :{
    type : String,
    required : true
  },
  guardiaId :{
    type: Schema.Type.ObjectId,
    ref : 'Guardias',
    required: 'true'
  }
});

module.exports = mongoose.model('Implementos', Implementos);
