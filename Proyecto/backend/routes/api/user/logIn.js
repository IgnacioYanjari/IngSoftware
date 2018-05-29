var bcrypt  = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models'),
  jwt = require('jsonwebtoken');

const isPassword = require('./../utils/isPassword'),
  isType = require('./../utils/isType'),
  configToken = require('./../../../system/configToken');

module.exports = async(req, res, next) => {
  const {body} = req;
  let {rut,password} = body;
  // verificación rut
  if( rut == null){
    return res.send({
      success : false,
      message : 'Error en RUT'
    })
  }

  // verificación password
  if( !isPassword(password)){
    return res.send({
      success : false,
      message : 'Error en contraseña ( tiene que ser de largo 9 ) '
    })
  }

  // se busca el usuario
  function findUser(password,rut){
    return User.findOne({
      rut : rut
    })
    .then(user => {
      return new Promise( (resolve,reject) => {
        // console.log(user)
        if(user == null){
          return reject('Error : Cuenta no registrada');
        }

        if(!user.validPassword(password)){
          return reject('Error: contraseña incorrecta');
        }
        return resolve(user);
      })
    })
  }


  // Retorno la respuesta.
  return findUser(password,rut)
    .then( (response) => {
      // console.log(response)
      UserSession.create({
        userId: response._id
      }, (err, doc) =>{
        if(err){
          return res.send({
            success: false,
            message: 'Error : error en servidor'
          })
        }
        // falta agregar nombres de usuario :)
        let token = jwt.sign( {dataUser : response, sessionId : doc._id},
          configToken.secret_key ,{
          expiresIn: 60 * 60 * 24 // que expire en 24HRS
        })

        return res.send({
          success:true,
          message: 'Ingreso validado',
          token : token
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
