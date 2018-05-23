var express = require('express'),
  bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js'),
  router = express.Router();

// Funciones usadas para api/user
var logIn = require('./logIn.js'),
  signIn = require('./signIn.js');

/* POST log-in. */
router.post('/log-in', logIn);

/* POST sign-in. */
router.post('/sign-in', signIn);

module.exports = router;
