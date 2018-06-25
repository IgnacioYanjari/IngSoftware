let bcrypt = require('bcrypt'),
  { Usuarios} = require('./../../../models/models.js'),
  models = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const isPassword = require('./../utils/isPassword.js'),
  isType = require('./../utils/isType.js'),
  isRut = require('./../utils/isRut.js'),
  isName = require('./../utils/isName.js'),
  createUser = require('./../../../models/utils/createUser.js'),
  configToken = require('./../../../system/configToken');

module.exports = async(req, res, next) => {
  const {body,token} = req;
  let {name,rut,email,password,type,direccion} = body;


  function checkVariables(email,rut,password,type){
    return new Promise((resolve,reject)=>{
      // verificación rut
      if(!isRut(rut))
        return reject('Error en RUT');

      // verificación de  nombre
      let auxName = isName(name);
      if(auxName != "true")
        return reject(auxName)


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
    .then( (response) => {
      let params = {
        rut:rut,
        typeUser: type,
        nombre : name,
        email: email,
        contraseña : password,
        direccion : direccion,
        contrato : ''
      }
      if( type == 1 )
        params.contrato = 'Full-Time';
      else if (type == 2)
        params.contrato = 'Part-Time';
      return createUser(params,models)
        .then( user => {
          return res.send({
            success: true,
            message : 'Cuenta creada correctamente'
          })
        })
        .catch( err => {
          return res.send({
            success : false,
            message : err.toString()
          })
        })
    })
    .catch ( err => {
      return res.send({
        success : false,
        message : err.toString()
      })
    })
  }

  return getDataUser(token)
    .then( user =>{
      if(user.dataUser.typeUser !== 5){
        let token2 = jwt.sign({
          dataUser : user.dataUser,
          sessionId : user.sessionId},
          configToken.secret_key ,{
          expiresIn: 60 * 60 * 24 // que expire en 24HRS
        })
        return res.send({
          success: false,
          token : token2,
          message : 'Permiso denegado'
        })
      }
      return checkVariables(email,rut,password,type)
        .then( email =>{
          return createAccount(email)
        })
        .catch( err => {
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
