module.exports = function(params,models,typeName){

  const {JefeGuardias, Guardias} = models;
  let {rut,usuarioId} = params

  function deleteInfoInGuardias(){
    return new Promise((resolve,reject)=>{
      JefeGuardias.findOne({
        rut:rut, usuarioId:usuarioId
      }).populate('guardiasId')
      .then( res =>{
        deleteJefeGuardia();
        let guardiasId = res.guardiasId;
        for( let guardia of guardiasId){
          guardia.jefesGuardiaId =
            guardia.jefesGuardiaId.filter(item => item == res._id)
          guardia.save(function(err,guardia){
            if(err)
              return reject(err)
          })
        }
        return resolve('Guardias desvinculados')
      })
    })
  }

  function deleteJefeGuardia(){
    return new Promise((resolve,reject)=>{
      JefeGuardias.deleteOne({
        rut:rut, usuarioId:usuarioId
      }, function(err,jefeGuardia){
        if(err)
          return reject(err);
        return resolve('JefeGuardia eliminado')
      })
    })
  }

  return new Promise ((resolve,reject) => {
    deleteInfoInGuardias()
    .then( res => resolve(res))
    .catch( err => reject(err));
  })
}
