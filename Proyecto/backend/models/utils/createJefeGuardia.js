module.exports = function(params,models,typeName){

  const {JefeGuardias} = models;
  let {rut,usuarioId} = params
  return new Promise ((resolve,reject) => {
    return JefeGuardias.create({
      rut:rut, usuarioId:usuarioId
    }, function(err,jefeGuardia){
      if(err)
        return reject(err);
      return resolve(typeName)
    })
  })
}
