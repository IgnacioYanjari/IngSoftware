var bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js');


module.exports = async(req, res, next) => {
  const {query} = req;
  let {token} = query;

  // si existe sesión
  function isExist(token){
    return UserSession.findOne({
      _id :token
    }).exec()
    .then(session => {
      if(session == null){
        return new Promise((resolve,reject)=>{
          return reject('Error : sesión ya cerrada');
        })
      }
    })
    .catch( err => {
      return new Promise((resolve,reject)=>{
        return reject(err);
      })
    })
  }


  // borrar solo si existe sesión
  isExist(token)
  .then( (response) =>{
    UserSession.deleteOne({
      _id : token
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
    if(err.name != null){
      return res.send({
        success:false,
        message : 'Error : No existe sesión'
      })
    }
    return res.send({
      success:false,
      message : err.toString()
    })
  })

};
