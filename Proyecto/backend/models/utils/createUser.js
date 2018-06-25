// Creación de usuario administrador.
let createTypeUser = require('./createTypeUser.js');

module.exports = function(params,models){


  let {Usuarios} = models;
  console.log(params)
  let { rut,typeUser,nombre,email,
        contraseña, direccion,
        contrato } = params;
  let arr = [
    'Guardia Full-Time',
    'Guardia Part-Time',
    'Jefe de Guardia',
    'Recusos Humanos',
    'Administrador'
  ]
  let typeName = arr[typeUser-1];
    return Usuarios.findOne({rut:rut})
    .then( user =>{
      return new Promise((resolve,reject) =>{
        if(user != null){
          return reject(typeName + ' ya creado');
        }
        else{
          const newUser = new Usuarios({
            email : email,
            rut : rut,
            typeUser : typeUser,
            nombre : nombre
          })
          newUser.contraseña = newUser.generateHash(contraseña)
          return newUser.save( (err,user) =>{
            if(err)
              return reject(err);
            else {
              return createTypeUser({
                typeUser : typeUser,
                rut : rut,
                _id : user._id,
                direccion : direccion,
                contrato : contrato
              }, models)
              .then(res => resolve(res))
              .catch( err => reject(err))
            }
          })
        }
      })
    })
}
