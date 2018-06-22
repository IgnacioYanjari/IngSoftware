const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

// Para usuarios, datos normales
const HorasTrabajadas = new mongoose.Schema({
  mes : {
    type: String,
    mes : Number,
    dia : Number,
    cantHoras : Number,
    required : true
  }
  guardiasId : [{
    type: Schema.Type.ObjectId,
    ref: 'Guardias'
  }]
});

module.exports = mongoose.model('HorasTrabajadas', HorasTrabajadas);
