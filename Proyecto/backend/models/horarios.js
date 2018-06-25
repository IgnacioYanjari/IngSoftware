const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const Horarios = new mongoose.Schema({
  inicio : {
    type: Date,
    required: true
  },
  termino:{
    type: Date,
    required : true
  },
  guardiaId :{
    type: Schema.Types.ObjectId,
    ref : 'Guardias',
    required : true
  }

});

module.exports = mongoose.model('Horarios', Horarios);
