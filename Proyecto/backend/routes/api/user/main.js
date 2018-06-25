let express = require('express'),
  bcrypt = require('bcrypt'),
  verifyToken = require('./../utils/verifyToken'),
  router = express.Router();


// Funciones usadas para api/user
let logIn = require('./logIn'),
  signIn = require('./signIn'),
  logOut = require('./logOut'),
  horasTrabajadas = require('./horasTrabajadas.js'),
  addHorario = require('./addHorario.js'),
  listaGuardias = require('./listaGuardias.js'),
  DeleteAccount = require('./deleteAccount');

/* POST log-in. */
router.post('/log-in', logIn);

/* POST sign-in. */
router.post('/sign-in',verifyToken, signIn);

/* POST log-out */
router.post('/log-out', verifyToken , logOut);

/* POST delete-account */
router.post('/delete-account', verifyToken , DeleteAccount);

/* Post para obtener horas trabajadas a guardia*/
router.post('/horas-trabajadas',verifyToken, horasTrabajadas);

/* Post para asignar horarios preferidos a guardia */
router.post('/add-horario',verifyToken,addHorario);

/* Post para obetener la lista de guardias asignados a un jefe de guardia*/
router.post('/get-listaGuardias',verifyToken, listaGuardias);

module.exports = router;
