let bcrypt = require('bcrypt'),
  { Usuarios, JefeGuardias, Guardias } = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken');

module.exports  = function(req,res,next){
  const {token} = req;

  function getDataUser(token){
    return new Promise((resolve,reject)=>{

      return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
        if(err)
          return reject(err);
        return resolve(decoded);
      })
    })
  }

  function buscarNombre(rut){
    return new Promise( (resolve,reject) => {
      return Usuarios.findOne({rut:rut})
        .then( usuario => {
          if(usuario == null)
            return reject('No se encuentra guardia asociado a rut')
          return resolve(usuario.nombre)
        })
        .catch( err => reject(err))
    })
  }

  function listaGuardias(rut){
    return new Promise((resolve,reject)=>{
      return JefeGuardias.findOne({rut:rut})
        .populate('guardiasId')
        .then( jefeGuardia =>{
          if(jefeGuardia == null)
            return reject('Jefe de guardia no encontrado')
          let guardiasId = jefeGuardia.guardiasId,
            arr = [];

          for( let guardia of guardiasId){
            arr.push( buscarNombre(guardia.rut) );
          }

          return Promise.all(arr)
          .then( values => {
            if(values.length == guardiasId.length)
              return resolve(values)
            return reject('no se encontraron todos')
          })
          .catch( err => reject(err));
        })
    })
  }

  return getDataUser(token)
  .then(user =>{
    if(user.dataUser.typeUser == 3 )
      return listaGuardias(user.dataUser.rut)
        .then( lista =>{
          let token2 = jwt.sign({
            dataUser : user.dataUser,
            sessionId : user.sessionId},
            configToken.secret_key ,{
            expiresIn: 60 * 60 * 24 // que expire en 24HRS
          })
          return res.send({
            success : true,
            token : token2,
            data : lista,
            message: 'Lista encontrada con éxito'
          })
        })
        .catch( err => {
          return res.send({
            succes: false,
            message : err.toString()
          })
        })
    else
      return res.send({
        success: false,
        message : 'Permiso denegado'
      })
    })
    .catch( err => {
      return res.send({
        success: false,
        message: err.toString()
      })
    })

  next();
}
