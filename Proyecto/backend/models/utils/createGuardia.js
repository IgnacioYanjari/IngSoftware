module.exports = function(params,models,typeName){

  const {TipoGuardias,Guardias,JefeGuardias} = models;

  let { rut,direccion,usuarioId,
        contrato } = params;

  const newGuardia = new Guardias({
    rut:rut, direccion: direccion,
    usuarioId:usuarioId
  })

  const newTipoGuardia = new TipoGuardias({
    contrato : contrato,
    guardiasId: newGuardia._id
  })
  newGuardia.tipoGuardiaId = newTipoGuardia._id;

  return new Promise( (resolve,reject) =>{
    return newGuardia.save( function( err, guardia) {
      if(err)
        return reject(err);
      else{
        return newTipoGuardia.save(function(err,guardia){
          if(err)
            return reject(err);
          return resolve(typeName);
        })
      }
    })
  })
}
