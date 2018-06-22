const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const Horarios = new mongoose.Schema({
  Inicio : {
    type: Date,
    required: true
  },
  Termino:{
    type: Date,
    required : true
  }
  guardiasId :{
    type: Schema.Type.ObjectId,
    ref : 'Guardias',
    required : true
  }

});

module.exports = mongoose.model('Horarios', Horarios);
