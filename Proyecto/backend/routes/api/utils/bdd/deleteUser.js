// Creación de usuario administrador.
let deleteTypeUser = require('./deleteTypeUser.js');

module.exports = function(params,models){


  let {Usuarios, SesionesUsuario} = models;
  let { _id,rut,typeUser,nombre,email,
        contraseña} = params;

  let arr = [
    'Guardia Full-Time',
    'Guardia Part-Time',
    'Jefe de Guardia',
    'Recusos Humanos',
    'Administrador'
  ]
  let typeName = arr[typeUser-1];

  function deleteSessions(userId){
    return new Promise( (resolve,reject) =>{
      return SesionesUsuario.deleteMany({
        userId : userId
      }, err => {
          if(err)
            return reject(err);
          return resolve(true);
      })
    })
  }

  function deleteUser(_id){
    return new Promise( (resolve, reject) =>{
      return Usuarios.deleteOne({
          _id:_id
        }, err =>{
          if(err)
            return reject(err);
          return resolve(true);
        })
    })
  }

  return new Promise((resolve,reject) => {
    return Promise.all([
        deleteSessions(_id),
        deleteUser(_id),
        deleteTypeUser(params,models)
      ])
        .then( values => resolve(values))
        .catch( err => reject(err))
  })
}
