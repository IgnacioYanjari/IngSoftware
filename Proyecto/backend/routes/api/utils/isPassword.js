
// isPassword : Verifica condiciones de password.

module.exports = function(password){

  // contraseña de largo 0.
  if( password.length == 0 || password == null )
    return false;

  // verificar que sea de largo 3.
  if( password.length == 9 )
    return true;

  return false;
}
