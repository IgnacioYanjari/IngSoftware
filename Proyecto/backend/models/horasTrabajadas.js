const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const HorasTrabajadas = new mongoose.Schema({
  mes : {
    type: Number,
    required : true
  },
  dia : {
    type : Number,
    required: true
  },
  cantidadHoras : {
    type : Number,
    required : true
  },
  guardiaId : {
    type: Schema.Types.ObjectId,
    ref: 'Guardias',
    required : true
  }
});

module.exports = mongoose.model('HorasTrabajadas', HorasTrabajadas);
