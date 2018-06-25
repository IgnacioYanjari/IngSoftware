let createAdmin = require('./createAdmin.js'),
  createGuardia = require('./createGuardia.js'),
  createJefeGuardia = require('./createJefeGuardia.js')
  createRRHH = require('./createRRHH.js')

// Crea las tablas dependiendo de que
// tipo de usuario es :

module.exports = function(params,models){

  let { typeUser,rut,
        _id,direccion} = params;

  return new Promise( (resolve,reject) =>{

    // Guardia Full-Time.
    if(typeUser == 1){

      if(direccion == null){
        return reject('ingrese direccion');
      }

      return createGuardia({
          rut : rut,
          usuarioId : _id,
          direccion : direccion,
          contrato : 'Full-Time'
        }, models, 'Guardia Full-Time creado')
        .then(res => resolve(res) )
        .catch( err => reject(err))
    }

    // Guardia Part-Time
    else if(typeUser == 2){

      if(direccion == null){
        return reject('ingrese direccion');
      }
      return createGuardia({
          rut : rut,
          usuarioId : _id,
          direccion : direccion,
          contrato : 'Part-Time'
        }, models ,'Guardia Part-Time creado')
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }

    // Jefe de Guardia
    else if (typeUser == 3){

      return createJefeGuardia({
          rut:rut,
          usuarioId : _id
        }, models, 'Jefe de Guardia Creado')
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }

    // Recursos Humanos
    else if (typeUser == 4){

      if(direccion == null){
        return reject('ingrese direccion')
      }

      return createRRHH({
          rut:rut,
          usuarioId : _id,
          direccion : direccion
        }, models , 'Recursos humano creado')
        .then(res => resolve(res) )
        .catch( err => reject(err))
    }

    // Administrador
    else if (typeUser == 5){
      return createAdmin({
          rut : rut,
          usuarioId : _id
        }, models ,'Administrador creado')
        .then(res => resolve(res) )
        .catch( err => reject(err))

    }
    else {
      return reject('Setup mal hecho');
    }
  })
}
