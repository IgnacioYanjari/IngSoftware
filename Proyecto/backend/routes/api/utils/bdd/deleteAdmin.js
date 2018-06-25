module.exports = function(params,models){
  const {Administrador} = models;
  let {rut,usuarioId} = params;

  return new Promise((resolve,reject) =>{
    return Administrador.deleteOne({
      rut:rut, usuarioId: usuarioId
    }, function(err){
      if(err)
        return reject(err)
      return resolve('Administrador eliminado')
    })
  })

}
