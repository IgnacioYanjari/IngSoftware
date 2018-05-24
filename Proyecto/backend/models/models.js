
var User  = require('./user.js'),
  UserSession = require('./userSession.js');

let models = {}
models.User = User;
models.UserSession = UserSession;

module.exports = models;
