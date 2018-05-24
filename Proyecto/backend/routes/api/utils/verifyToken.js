
// FORMAT OF TOKEN
// Authorization :  Bearer <access_token>
module.exports = function(req,res,next){
  // Obtener valor de cabecera de autorización.
  const bearerHeader = req.headers['authorization']
  // Verificar que no sea indefinido
  if( typeof bearerHeader == 'undefined'){
    return res.send({
      success: false,
      message : 'No se envió token'
    })
  }
  // Separamos debido a que estan separados por espacio.
  const  bearer = bearerHeader.split(' ');
  // Obtenemos token.
  const bearerToken = bearer[1];
  // Guardamos en req
  req.token = bearerToken;
  // Seguimos con el siguiente middleware
  next();
}
