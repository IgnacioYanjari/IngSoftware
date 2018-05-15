var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Prueba de envio mensaje
  // const from = "56989628842";
  // const to = '56975565910';
  // const text = " Te amo muchio amor <3 \n";
  // nexmo.message.sendSms(from,to,text,
  //   (err, responseData)=>{
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(responseData);
  //     }
  //   });
  res.render('index', { title: 'Mensaje enviado' });
});

module.exports = router;
