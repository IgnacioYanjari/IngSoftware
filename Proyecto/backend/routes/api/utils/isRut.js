
// isRut : Verifica si existe rut es válido en chile.

module.exports = function(rut){
  if(rut.length == 0 || rut == null)
    return false

  cuerpo = rut.slice(0,-1);
  if(cuerpo.length < 7)
    return false;

  // Calcular Dígito Verificador
  suma = 0;
  multiplo = 2;
  dv = rut.slice(-1).toUpperCase();

  // Para cada dígito del Cuerpo
  for(i=1;i<=cuerpo.length;i++) {
      // Obtener su Producto con el Múltiplo Correspondiente
      index = multiplo * rut.charAt(cuerpo.length - i);
      // Sumar al Contador General
      suma = suma + index;
      // Consolidar Múltiplo dentro del rango [2,7]
      if(multiplo < 7){
        multiplo = multiplo + 1;
      }else{
         multiplo = 2;
      }
  }

  // Calcular Dígito Verificador en base al Módulo 11
  dvEsperado = 11 - (suma % 11);

  // Casos Especiales (0 y K)
  dv = (dv == 'K')? 10 : dv;
  dv = (dv == 0)? 11 : dv;
  if(dvEsperado != dv)
    return false;

  return true;
}
