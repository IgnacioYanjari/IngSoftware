var bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js');

const isPassword = require('./../utils/isPassword.js'),
  isType = require('./../utils/isType.js');

module.exports = async(req, res, next) => {
  const {query} = req;
  let {rut,email,password,type} = query;

  // verificación rut
  if( rut.length == 0 || rut == null){
    return res.send({
      success : false,
      message : 'Error en RUT'
    })
  }

  // verificación email
  if( email.length == 0 || email == null){
    return res.send({
      success : false,
      message : 'Error en e-mail'
    })
  }

  // verificación password
  if( !isPassword(password)){
    return res.send({
      success : false,
      message : 'Error en contraseña'
    })
  }

  // verificación type
  if( !isType(type)){
    return res.send({
      success : false,
      message : 'Error en tipo usuario'
    })
  }

  // se busca el usuario
  function findUser(password,rut,type,email){
    return User.findOne({
      rut : rut,
      typeUser : type,
      email : email.toLowerCase()
    })
    .then(user => {
      return new Promise( (resolve,reject) => {
        if(user == null){
          return reject('Cuenta no registrada');
        }

        if(!user.validPassword(password)){
          return reject('Error: contraseña incorrecta');
        }
        return resolve({id:user._id});
      })
    })
  }


  // Retorno la respuesta.
  return findUser(password,rut,type,email)
    .then( (response) => {
      // console.log(response)
      UserSession.create({
        userId: response.id
      }, (err, doc) =>{
        if(err){
          return res.send({
            success: false,
            message: 'Error : error en servidor'
          })
        }
        return res.send({
          success:true,
          message: 'Ingreso validado',
          token : doc._id
        })
      })
    })
    .catch ( err => {
      // buscar el como imprimir un error :)
      return res.send({
        success : false,
        message : err.toString()
      });
    })
};
