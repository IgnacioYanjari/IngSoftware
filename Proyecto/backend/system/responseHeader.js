module.exports = function( req, res,next){
  // Configuración de la respuesta de cabezera.
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  // res.header("Access-Control-Allow-Headers","*");
  next();
}
