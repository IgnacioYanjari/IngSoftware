module.exports = function(params,models,typeName){

  const {Clientes,Horarios,TipoGuardias,
    Guardias,HorasTrabajadas,JefeGuardias} = models;

  let { rut,usuarioId} = params;

  function deleteHorario(horarios){
    return new Promise((resolve,reject)=>{
      for(let horario of horarios){
        Horarios.findOneAndRemove({_id:horario._id})
        .catch( err => reject(err))
      }
      return resolve('Horarios eliminados');
    })
  }

  function deleteTipoGuardia(TipoGuardia){
    return new Promise((resolve,reject)=>{
      TipoGuardias.findOneAndRemove({_id:TipoGuardia._id})
      .then( res => resolve('TipoGuardia eliminado'))
      .catch( err => reject(err));
    })
  }

  function deleteImplementos(implementos){
    return new Promise((resolve,reject)=>{
      for(let implemento of implementos){
        Implementos.findOneAndRemove({_id:implemento._id})
        .catch( err => reject(err))
      }
      return resolve('Implementos eliminados');
    })
  }

  function deleteHorasTrabajadas(horasTrabajadas){
    return new Promise((resolve,reject) => {
      for(let horatrabajada of horasTrabajadas){
        HorasTrabajadas.findOneAndRemove({_id: horatrabajada._id})
        .catch(err => reject(err))
      }
      return resolve('HorasTrabajadas eliminadas')
    })
  }

  function deleteGuardia(guardiaId){
    return new Promise((resolve,reject) => {
      Guardias.findOneAndRemove({_id:guardiaId})
      .then( res => resolve('Guardia eliminado'))
      .catch( err => reject(err))
    })
  }

  return new Promise( (resolve,reject) => {
    return Guardias.findOne({rut:rut,usuarioId:usuarioId})
      .populate('horariosId')
      .populate('implementosId')
      .populate('horasTrabajadasId')
      .populate('TipoGuardia')
      .then( guardia =>{
        return Promise.all([
            deleteHorario(guardia.horariosId),
            deleteImplementos(guardia.implementosId),
            deleteHorasTrabajadas(guardia.horasTrabajadasId),
            deleteTipoGuardia(guardia.tipoGuardiaId),
            deleteGuardia(guardia._id)
          ])
          .then( res => resolve(res))
          .catch( err => reject(err))
      })
      .catch( err => reject(err))
  })

}
