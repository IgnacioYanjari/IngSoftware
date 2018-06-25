module.exports = function(models){

  const {HorasTrabajadas, Guardias} = models;

  return new Promise((resolve,reject)=>{
    return Guardias.find()
    .then( (guardias) =>{
      if(guardias == null)
        return reject('No existen guardias');
      let aux = 6;
      for( let guardia of guardias){

        const newHorasTrabajadas = new HorasTrabajadas({
          mes : 6,
          dia : 20,
          cantidadHoras: aux,
          guardiaId : guardia._id
        });

        guardia.horasTrabajadasId.push(newHorasTrabajadas._id);

        guardia.save( function(err,guardia){
          if(err)
            return reject(err);
          return newHorasTrabajadas.save( function(err,horaTrabajada){
            if(err)
              return reject(err);
          })
        })
        aux = aux+2;
      }
      return resolve('Hora asignada correctamente');
    })

  })
}
