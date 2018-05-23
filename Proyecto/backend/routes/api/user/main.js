var express = require('express'),
  bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js'),
  router = express.Router();

// Funciones usadas para api/user
var logIn = require('./logIn'),
  signIn = require('./signIn'),
  logOut = require('./logOut')

/* POST log-in. */
router.post('/log-in', logIn);

/* POST sign-in. */
router.post('/sign-in', signIn);

/* POST log-out */
router.post('/log-out',logOut)

module.exports = router;
