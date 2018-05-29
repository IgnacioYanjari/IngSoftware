var express = require('express'),
  bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js'),
  verifyToken = require('./../utils/verifyToken'),
  router = express.Router();


// Funciones usadas para api/user
var logIn = require('./logIn'),
  signIn = require('./signIn'),
  logOut = require('./logOut'),
  DeleteAccount = require('./deleteAccount');

/* POST log-in. */
router.post('/log-in', logIn);

/* POST sign-in. */
router.post('/sign-in', signIn);

/* POST log-out */
router.post('/log-out', verifyToken , logOut)

/* POST delete-account */
router.post('/delete-account', verifyToken , DeleteAccount)

module.exports = router;
