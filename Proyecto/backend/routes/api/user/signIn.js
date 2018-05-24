var bcrypt = require('bcrypt'),
  { User, UserSession } = require('./../../../models/models.js');

const isPassword = require('./../utils/isPassword.js'),
  isType = require('./../utils/isType.js'),
  isRut = require('./../utils/isRut.js');

module.exports = async(req, res, next) => {
  const {body} = req;
  let {rut,email,password,type} = body;

  // verificación rut
  if(!isRut(rut)){
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

  // Buscar que no exista cuenta asociada a mail o rut entregado
  function isValidEmail(email){
    return User.find().or([
      {email : email} , {rut : rut}
    ]).then( response =>{
      return new Promise((resolve,reject)=>{
        if(response.length == 0)
          return resolve('email y rut desocupado');

        return reject('email o rut ocupado por otra cuenta');
      })
    })
  }

  // Retorno la respuesta.
  return isValidEmail(email)
  .then( (response) =>{
    const newUser = new User({
      email : email.toLowerCase(),
      rut : rut,
      typeUser : type
    });
    newUser.password = newUser.generateHash(password);
    newUser.save( (err,user)=>{
      if(err){
        return res.send({
          succes:false,
          message: 'Error : error en servidor'
        })
      }
      return res.status(200).send({
        success : true,
        message : 'Usuario creado con exito'
      })
    })
  })
  .catch ( (err) => {
    return res.send({
      success : false,
      message : err.toString()
    })
  })
};
