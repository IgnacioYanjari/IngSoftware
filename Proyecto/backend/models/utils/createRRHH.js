module.exports = function(params,models,typeName){

  const {RecursosHumanos} = models;
  let {rut,direccion,usuarioId} = params

  return new Promise ((resolve,reject) => {
    RecursosHumanos.create({
        rut:rut, usuarioId:usuarioId,
        direccion : direccion,
      }, function(err,recursosHumano) {
        if(err)
          return reject(err);
        return resolve(typeName);
      })
  })

}
