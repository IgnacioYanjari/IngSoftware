const mongoose = require('mongoose');

// Se usa cuando los usuarios ingresan por diferentes plataformas a la pagina

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: -1
  },
  timestamp:{
    type: Date,
    default: Date.now()
  },
  isDeleted :{
    type : Boolean,
    default: false
  }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
