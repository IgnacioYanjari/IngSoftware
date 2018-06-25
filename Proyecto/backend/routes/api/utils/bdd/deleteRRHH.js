module.exports = function(params,models,typeName){

  const {RecursosHumanos} = models;
  let {rut,usuarioId} = params

  return new Promise ((resolve,reject) => {
    RecursosHumanos.deleteOne({
        rut:rut, usuarioId:usuarioId
      }, function(err,recursosHumano) {
        if(err)
          return reject(err);
        return resolve('Recurso humano eliminado');
      })
  })

}
