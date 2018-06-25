let createUser = require('./utils/createUser.js'),
  addHorasTrabajadas = require('./utils/addHorasTrabajadas.js');

const mongoose = require('mongoose');

module.exports = function(models){
  let
  { Usuarios,
   Administrador,
   JefeGuardias,
   RecursosHumanos,
   Guardias,
   TipoGuardias
 } = models

function asignarGuardias(){
  return new Promise((resolve,reject)=>{
    return JefeGuardias.findOne({rut:'111666059'},
        (err ,jefeGuardia) => {
          if(err)
              return reject(err)
          else {
            if(jefeGuardia == null)
              return reject('No existe jefeGuardia')

            return Guardias.find({}, (err,guardias) => {
                if(err)
                  return reject(err)
                let arr = []
                for(let guardia of guardias){
                  guardia.jefesGuardiaId.push(jefeGuardia._id);
                  guardia.save( (err,res) =>{
                    if( err)
                      return reject(err)
                    arr.push(res);
                  })
                  jefeGuardia.guardiasId.push(guardia._id);
                }
                return jefeGuardia.save((err,res) => {
                  if(err)
                    return reject(err)
                  else
                    return resolve({jefeGuardia : res , Guardias : arr})
                })

              })
          }
        })
    })
  }

  Promise.all([
      //ADMIN
      createUser( {
        rut:'192098327',
        email: 'ignacio.yanjari@mail.udp.cl',
        typeUser:5,
        nombre: ' Ignacio Antonio Yanjari Saez',
        contraseña : 'telescopi'
        }, models ),

      //Jefe guardia
      createUser({
        rut:'111666059',
        email : 'dsaljk@djklsa.cl',
        typeUser: 3,
        nombre : 'Loreto Maria Saez Marin',
        contraseña: 'aaaaaaaaa',
      }, models ),

      // RRHH
      createUser({
        rut:'189556373',
        email: 'juanjo@gmail.com',
        typeUser:4,
        nombre: 'Juan Jose Saez Vergara',
        direccion : 'Miraflores N° 70, Ciudad de Santiago.',
        contraseña:'aaaaaaaaa'
      }, models),

      // Full time
      createUser({
        rut : '183934708',
        email : 'pablo.veliz@mail.udp.cl',
        typeUser : 1,
        nombre : 'Pablo Antonio Veliz Morgan',
        contraseña : 'aaaaaaaaa',
        direccion  : 'Miraflores N° 51, Ciudad de Santiago.'
      }, models ),

      // Partime
      createUser({
        rut : '194223080',
        email : 'dagoberto.navarrete@mail.udp.cl',
        typeUser : 2,
        nombre : 'Dagoberto Juan Navarrete Saez',
        contraseña : 'aaaaaaaaa',
        direccion  : 'Miraflores N° 52, Ciudad de Santiago.'
      }, models )

    ]).then( values => {
        asignarGuardias()
          .then(res => {
            addHorasTrabajadas(models)
            .then(res => console.log(res))
          })
      })
      .catch(err => console.log( err.toString()))
}
