
// isType : verifica si existe type enviado.

module.exports = function(type){

  // si no se envia tipo de usuario.
  if(type == 0 || type == null)
    return false

  // si es Guardia normal.
  if( type == 1 )
    return true;

  // si es Guardia Part-Time.
  if( type == 2)
    return true;

  // si es Jefe de guardia.
  if( type == 3)
    return true;

  // si es de RR.HH
  if( type == 4)
    return true;

  return false;
}
