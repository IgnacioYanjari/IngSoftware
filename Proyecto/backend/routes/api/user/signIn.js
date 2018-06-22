var bcrypt = require('bcrypt'),
  { Usuarios } = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const isPassword = require('./../utils/isPassword.js'),
  isType = require('./../utils/isType.js'),
  isRut = require('./../utils/isRut.js'),
  configToken = require('./../../../system/configToken');

module.exports = async(req, res, next) => {
  const {body,token} = req;
  let {rut,email,password,type} = body;


  function checkVariables(email,rut,password,type){
    return new Promise((resolve,reject)=>{
      // verificación rut
      if(!isRut(rut))
        return reject('Error en RUT');

      // verificación email
      if( email == null){
        return reject('Error en e-mail');
        if(email.length == 0 )
          return reject('Error en e-mail');
      }

      // verificación password
      if( !isPassword(password))
        return reject('Error en contraseña');

      // verificación type
      if( !isType(type))
        return reject('Error en tipo usuario');

      return resolve(email)
    })
  }



  function getDataUser(token){
    return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
      if(err){
        return new Promise( (resolve,reject) => reject(err) )
      }
      return new Promise((resolve,reject) => resolve(decoded));
    })
  }


  // Buscar que no exista cuenta asociada a mail o rut entregado
  function isValidEmail(email){
    return Usuarios.find().or([
      {email : email} , {rut : rut}
    ]).then( response =>{
      return new Promise((resolve,reject)=>{
        if(response.length == 0)
          return resolve('email y rut desocupado');

        return reject('email o rut ocupado por otra cuenta');
      })
    })
  }

  function createAccount(email){
    return isValidEmail(email)
    .then( (response) =>{
      const newUser = new Usuarios({
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
  }

  return getDataUser(token)
    .then( user =>{
      console.log(user);
      if(user.dataUser.typeUser !== 5){
        return res.send({
          success: false,
          message : 'Permiso denegado'
        })
      }
      return checkVariables(email,rut,password,type)
        .then( email =>{
          return createAccount(email)
        })
        .catch( err =>{
          return res.send({
            success: false,
            message : err.toString()
          })
        })
    })
    .catch( err =>{
      res.send({
        success: false,
        message : err.toString()
      })
    })
};
