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


var pedidos=[];


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


////////////////////////////////////////////////     Cliente
//  Solicitar pedido al restaurante

router.post('/cliente/pedido', [verify], function (req, res) {
  try {
            const {id} = req.user.client;
            const {pedido} = req.body;
            const {direccion} = req.body;

            var estado = getRandomInt(2);
            var estado_repartidor = getRandomInt(2);

            var resultado={
                          id,
                          "estado": (estado ==1 ? true : false),
                          "estado_repartidor": (estado_repartidor ==0 ? true : false),
                          pedido,
                          "descripcion": "restaurante "+id+" recibio pedido",
                          direccion                          
                          }
          var existencia = false;
           pedidos.forEach(element => {
           if(element.id == resultado.id){
           existencia = true;
           resultado = element;
           }                
          });  

           if(existencia == false){
            pedidos.push(resultado);
           }    
          

          global.log.info(`pedido recibido de cliente`);
          res.send(resultado);
            
  } catch (error) {
    global.log.info(`pedido no recibido de cliente - ${error}`);

    
  }
  





});




// Verificar estado del pedido al restaurante
router.post('/cliente/verifica/pedido', [verify], function (req, res) {
  try {
            const {id} = req.user.client;   
            var estado;
            var existencia = false; 


            pedidos.forEach(element => {
            if(element.id){
              estado = element.estado;
            existencia=true;  
            }


            //console.log(element.id);
            });

            if(existencia == false){
              
                var resultado={
                          id,
                          "descripcion": "Pedido No encontrado"
                          }

             }else    {
              var resultado={
                id,
                estado,
                "descripcion": "Pedido encontrado"
                }
            
             }

           

          

          global.log.info(`busqueda pedido satisfactorio`);
          res.send(resultado);
            
  } catch (error) {
    global.log.info(`no se pudo buscar pedido - ${error}`);

    
  }
  





});





// Verificar estado del pedido al repartidor
router.post('/cliente/estado/repartidor', [verify], function (req, res) {
  try {
            const {id} = req.user.client;   
            var estado_repartidor;
            var existencia = false; 


            pedidos.forEach(element => {
            if(element.id){
              estado_repartidor = element.estado_repartidor;
            existencia=true;  
            }


            //console.log(element.id);
            });

            if(existencia == false){
              
                var resultado={
                          id,
                          "descripcion": "Pedido No encontrado ni estado"
                          }

             }else    {
              var resultado={
                id,
                estado_repartidor,
                "descripcion": "Estado del repartidor"
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
