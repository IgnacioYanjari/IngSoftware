module.exports = function(params,models,typeName){

  const {Administrador} = models;
  let {rut,usuarioId} = params
  return new Promise((resolve,reject)=>{
    return Administrador.create({
        rut:rut, usuarioId:usuarioId
      },function(err,admin){
        if(err)
          return reject(err);
        return resolve(typeName);
      })
  })
}
