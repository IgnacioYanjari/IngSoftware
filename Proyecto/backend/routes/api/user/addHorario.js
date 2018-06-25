let bcrypt = require('bcrypt'),
  { Guardias, Horarios} = require('./../../../models/models.js'),
  jwt = require('jsonwebtoken');

const configToken = require('./../../../system/configToken'),
  moment = require('moment');

module.exports  = function(req,res,next){
  const {body,token} = req;
  let {dates} = body;

  function getDataUser(token){
    return new Promise((resolve,reject)=>{

      return jwt.verify(token,configToken.secret_key, (err,decoded) =>{
        if(err)
          return reject(err);
        return resolve(decoded);
      })
    })
  }

  // 12 AM == "12 de la madrugada"

  function AsignarHorarioGuardia(rut){
    return new Promise((resolve,reject)=>{
      Guardias.findOne({ rut:rut})
        .populate('horariosId')
        .then(guardia => {
          if(guardia == null)
            return reject('No existe guardia')
          for (let date of dates ){
            date = new Date(moment(date).format("YYYY-MM-DD  h:mm:ss a"));
            dateIni = new Date(moment(date).format("YYYY-MM-DD  h:mm:ss a"));
            let arr = guardia.horariosId.filter(horario =>
                horario.inicio.getTime() == dateIni.getTime() )
            if(arr.length != 0)
              return reject('horario ' + moment(date).format("YYYY-MM-DD") +
                ' ya creado anteriormente');
          }

          for( let date of dates){

            date = new Date(moment(date).format("YYYY-MM-DD  h:mm:ss a"));
            dateIni = new Date(moment(date).format("YYYY-MM-DD  h:mm:ss a"));
            date = new Date(date.getTime() + 24*60*60*1000 - 1);
            dateFin = new Date(moment(date).format("YYYY-MM-DD  h:mm:ss a"));

              const newHorario = new Horarios({
                inicio : dateIni, termino : dateFin,
                guardiaId : guardia._id
              })

              let a = newHorario.save()

              guardia.horariosId.push(newHorario._id);
              let b = guardia.save()

              Promise.all([b,a])
                .catch(err => reject(err))

            }
          return resolve('horarios asignados con exito')
        })
    })
  }

  return getDataUser(token)
  .then(user =>{
    let {typeUser} = user.dataUser;
    if( typeUser == 1 || typeUser == 2 ){
      return AsignarHorarioGuardia(user.dataUser.rut)
        .then( response => {
          let token2 = jwt.sign({
            dataUser : user.dataUser,
            sessionId : user.sessionId},
            configToken.secret_key ,{
            expiresIn: 60 * 60 * 24 // que expire en 24HRS
          })
          res.send({
            success: true,
            token : token2,
            message: response
          })
        })
        .catch( err => {
          res.send({
            success: false,
            message: err.toString()
          })
        })
    }
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
