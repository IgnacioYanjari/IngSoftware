let bcrypt = require('bcrypt'),
  { Usuarios, SesionesUsuario } = require('./../../../models/models.js'),
  models = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken'),
  deleteOthers = require('./../utils/bdd/deleteUser.js');

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
      rut: rut.toString()
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


  function deleteAccount(myRut,rut,token2){
    return findUser(rut)
    .then( user => {
        if( myRut != user.rut)
          return deleteOthers(user,models)
            .then( response =>{
              return res.send({
                success: true,
                token: token2,
                message: 'Cuenta eliminada correctamente'
              })
            })
        else return res.send({
            success: false,
            message : 'No te puedes borrar a ti mismo'
          })
      })
    .catch( err => res.send({
        success: false,
        message: err.toString()
      })
    )
  }

  getDataUser(token)
  .then( response =>{
    if(response.dataUser.typeUser == 5){
      let token2 = jwt.sign({
        dataUser : response.dataUser,
        sessionId : response.sessionId},
        configToken.secret_key ,{
        expiresIn: 60 * 60 * 24 // que expire en 24HRS
      })
      return deleteAccount(response.dataUser.rut,rut,token2)
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
