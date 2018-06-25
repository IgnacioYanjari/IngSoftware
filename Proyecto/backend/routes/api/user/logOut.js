let bcrypt = require('bcrypt'),
  { Usuarios, SesionesUsuario } = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken');

module.exports = async(req, res, next) => {
  let {token} = req;

  function getSessionId(token){
    return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
      if(err){
        return new Promise( (resolve,reject) => reject(err) )
      }
      return new Promise((resolve,reject) => resolve(decoded.sessionId));
    })
  }

  // si existe sesión
  function isExist(sessionId){
    return SesionesUsuario.findOne({
      _id :sessionId
    }).exec()
    .then(session => {
      if(session == null){
        return new Promise((resolve,reject)=>{
          return reject('Error : sesión ya cerrada');
        })
      }
      return new Promise( (resolve,reject) => resolve(sessionId))
    })
    .catch( err => {
      return new Promise((resolve,reject)=>{
        return reject(err);
      })
    })
  }

  function searchAndExistSession(token){
    return getSessionId(token)
      .then( sessionId => isExist(sessionId))
      .catch( err => new Promise( (resolve,reject) => reject(err)) );
  }

  searchAndExistSession(token)
  .then( (sessionId) =>{
    SesionesUsuario.deleteOne({
      _id : sessionId
    }, err =>{
      if(err){
        return res.send({
          success : false,
          message: err.toString()
        })
      }
      return res.send({
        success : true,
        message : 'Sesión cerrada con exito'
      })
    })
  })
  .catch(err =>{
    return res.send({
      success:false,
      message : err.toString()
    })
  })

};
