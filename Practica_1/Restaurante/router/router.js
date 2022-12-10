const express = require('express');
const router = express.Router();
const authenticate = require('../utils/authenticate')
const verify = require('../utils/checkAuth')


router.get('/', function (req, res) {
  res.send('Practica 1');
});

// create user
router.post('/cliente', function (req, res) {
  const user = {
    id: 1,
    name: 'TONY MUX',
    email: 'pgmail@gmail.com',
  };

  const token = authenticate.setToken(user);
  global.log.info(`Token generado ${token.token}`);
  res.send(token);
});

router.post('/prueba1', [verify], function (req, res) {
  const {id} = req.user.client;
  res.send(`${id}`);
}); 


var arreglos=[];


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


//Restaurante
// o Recibir pedido del cliente -  Post

router.post('/restaurante/recibir/pedido', [verify], function (req, res) {
  try {
            const {id} = req.user.client;
            const {productos} = req.body;

            var estado = getRandomInt(2);
            var estado_repartidor = getRandomInt(2);

            var resultado={
                          id,
                          "estado": (estado ==1 ? true : false),
                          "estado_repartidor": (estado_repartidor ==0 ? true : false),
                          productos,
                          "direccion": "28 calle zona 1 de Guatemala"
                          }
          var existencia = false;
           arreglos.forEach(element => {
           if(element.id == resultado.id){
           existencia = true;
           resultado = elemnt;
           }                
          });  

           if(existencia == false){
            arreglos.push(resultado);
           }    
          

          global.log.info(`pedido recibido`);
          res.send(arreglos);
            
  } catch (error) {
    global.log.info(`pedido no recibido - ${error}`);

    
  }
  





});




// o Informar estado del pedido al cliente - Get
router.post('/restaurante/estado/pedido', [verify], function (req, res) {
  try {
            const {id} = req.user.client;   
            var estado;
            var existencia=false;

            arreglos.forEach(element => {
            if(element.id==id){
              estado = element.estado;
              existencia = true;
              }


            //console.log(element.id);
            });

            if(existencia == false){
              var resultado={
                id,
                "descripcion":"no hay pedido ni estado"

                }

              }else{
                var resultado={
                  id,
                  estado,
                  "descripcion":"Estado del pedido al restaurante"
                  }

                }

            
          

          global.log.info(`busqueda pedido satisfactorio`);
          res.send(resultado);
            
  } catch (error) {
    global.log.info(`no se pudo buscar pedido - ${error}`);

    
  }
  





});





// o Avisar al repartidor que ya está listo el pedido
router.post('/restaurante/aviso/repartidor', [verify], function (req, res) {
  try {
    const {id} = req.user.client;   
    var estado;
    var existencia=false;

    arreglos.forEach(element => {
    if(element.id==id){
      estado = element.estado;
      existencia = true;
      }


    //console.log(element.id);
    });

    if(existencia == false){
      var resultado={
        id,
        "descripcion":"No hay pedido ni estado"

        }

      }else{
        var resultado={
          id,
          estado,
          "descripcion":"Aviso del estado al repartidor"
          }

        }

    
  

  global.log.info(`busqueda pedido satisfactorio`);
  res.send(resultado);
    
} catch (error) {
global.log.info(`no se pudo buscar pedido - ${error}`);


}






});







// export this router to use in our index.js
module.exports = router;
