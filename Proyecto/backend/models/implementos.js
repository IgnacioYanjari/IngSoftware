const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const Implementos = new mongoose.Schema({
  nombre : {
    type: String,
    default: ''
  },
  tipo:{
    type: String,
    default: ''
  },
  cantidad :{
    type: Number,
    default: ''
  },
  detalles :{
    type : String,
    default: ''
  },
  guardiaId :{
    type: Schema.Type.ObjectId,
    ref : 'Guardias',
    required: 'true'
  }
});

module.exports = mongoose.model('Implementos', Implementos);
