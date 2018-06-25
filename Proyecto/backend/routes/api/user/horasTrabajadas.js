let bcrypt = require('bcrypt'),
  { Guardias } = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken');

module.exports  = function(req,res,next){
  const {body,token} = req;
  let {rut} = body;

  function getDataUser(token){
    return new Promise((resolve,reject)=>{

      return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
        if(err)
          return reject(err);
        return resolve(decoded);
      })
    })
  }

  let monthToday = (new Date()).getMonth() + 1;

  function searchGuardia(rut){

    return new Promise( (resolve,reject) => {

      return Guardias.findOne({rut:rut})
        .populate('horasTrabajadasId')
        .then( guardia => {
          if(guardia == null)
            return reject('No existe guardia con datos ingresados')

          let horasTrabajadas = guardia.horasTrabajadasId,
            sum = 0;

          for( let horas of  horasTrabajadas){
            if(horas.mes == monthToday)
              sum = sum + horas.cantidadHoras;
          }
          return resolve(sum);
        })
        .catch(err => reject(err))
    })
  }

  return getDataUser(token)
  .then(user =>{
    if(user.dataUser.typeUser == 4 )
      return searchGuardia(rut)
        .then( horas_trabajadas =>{
          let token2 = jwt.sign({
            dataUser : user.dataUser,
            sessionId : user.sessionId},
            configToken.secret_key ,{
            expiresIn: 60 * 60 * 24 // que expire en 24HRS
          })
          return res.send({
            success : true,
            horas : horas_trabajadas,
            token: token2,
            message: 'Horas totales trabajadas en mes ' +
              monthToday
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
