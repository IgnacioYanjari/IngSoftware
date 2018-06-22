var bcrypt = require('bcrypt'),
  { Usuarios, SesionesUsuario } = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken');

module.exports = async(req, res, next) => {
  let {token} = req;
  let {rut} = req.body;

  function getDataUser(token){
    return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
      if(err){
        return new Promise( (resolve,reject) => reject(err) )
      }
      return new Promise((resolve,reject) => resolve(decoded));
    })
  }

  function findUser(rut){
    return Usuarios.findOne({
      rut: rut
    })
    .then( user =>{
      return new Promise( (resolve,reject) =>{
        if(user == null)
          return reject('Error : Cuenta no existente')
        return resolve(user)
      })
    })
  }

  function deleteSessions(userId){
    return SesionesUsuario.deleteMany({
      userId : userId
    }, err =>{
      return new Promise( (resolve,reject) =>{
        if(err)
          return reject(err);
        return resolve(true);
      })
    })
  }

  function deleteUser(rut){
    return Usuarios.deleteOne({
      rut:rut
    }, err =>{
      return new Promise( (resolve, reject) =>{
        if(err)
          return reject(err);
        return resolve(true);
      })
    })
  }

  function deleteAccount(rut){
    return findUser(rut)
    .then( user => {
      deleteUser(rut)
      .then( isDeleteUser =>
        deleteSessions(user.rut)
        .then( isDeleteSession => res.send({
            success : true,
            message : 'Sesiones y usuario borradas'
          })
        )
      )
    })
    .catch( err => res.send({
        success: false,
        message: err.toString()
      })
    )
  }

  getDataUser(token)
  .then( dataUser =>{
    if(dataUser.dataUser.typeUser == 5){
      return deleteAccount(rut)
    }
    return res.send({
      success: false,
      message : 'Permiso denegado'
    })

  })
  .catch( err => res.send({
      success: false,
      message: err.toString()
    })
  )

};
