let deleteAdmin = require('./deleteAdmin.js'),
  deleteGuardia = require('./deleteGuardia.js'),
  deleteJefeGuardia = require('./deleteJefeGuardia.js')
  deleteRRHH = require('./deleteRRHH.js')

// Crea las tablas dependiendo de que
// tipo de usuario es :

module.exports = function(params,models){

  let { typeUser,rut,
        _id,direccion} = params;

  return new Promise( (resolve,reject) =>{

    // Guardia Full-Time -- Falta
    if(typeUser == 1){

      return deleteGuardia({
          rut : rut,
          usuarioId : _id
        }, models, 'Guardia Full-Time eliminado')
        .then(res => resolve(res) )
        .catch( err => reject(err))
    }

    // Guardia Part-Time -- Falta
    else if(typeUser == 2){

      return deleteGuardia({
          rut : rut,
          usuarioId : _id
        }, models, 'Guardia Part-Time eliminado')
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }

    // Jefe de Guardia -- Listo
    else if (typeUser == 3){

      return deleteJefeGuardia({
          rut:rut,
          usuarioId : _id
        }, models)
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }

    // Recursos Humanos -- Listo
    else if (typeUser == 4){

      return deleteRRHH({
          rut:rut,
          usuarioId : _id,
        }, models)
        .then(res => resolve(res) )
        .catch( err => reject(err))
    }

    // Administrador -- Listo
    else if (typeUser == 5){
      return deleteAdmin({
          rut : rut,
          usuarioId : _id
        }, models)
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }
    else {
      return reject('Setup mal hecho');
    }
  })
}
