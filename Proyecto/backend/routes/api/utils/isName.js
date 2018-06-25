
// isName : Verifica el nombre ingresado

module.exports = function(name){

  let arrName = name.split(' ');

  // Verificar que las mayusculas correspondientes existan
  for(let i of arrName){
    let character = i[0];
    if(character != character.toUpperCase()){
      return "Primeras letras de apellidos y nombres" +
        " deben contener mayusculas"
    }
  }

  // Verificar si realmente son 4 string separados por ' '
  if( arrName.length != 4)
    return "Se debe ingresar el nombre completo" +
      " (primer y segundo nombre en conjunto con" +
      " Apellido paterno y materno)"

  return "true";

}
