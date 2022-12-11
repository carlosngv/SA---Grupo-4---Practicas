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


router.post('/restaurante', function (req, res) {
  const user = {
    id: 1,
    name: 'TONY MUX',
    email: 'pgmail@gmail.com',
  };

  res.send(authenticate.setToken(user));
});


router.post('/repartidor', function (req, res) {
  const user = {
    id: 1,
    name: 'TONY MUX',
    email: 'pgmail@gmail.com',
  };

  res.send(authenticate.setToken(user));
});


router.post('/prueba1', [verify], function (req, res) {
  const {id} = req.user.client;
  res.send(`${id}`);
});


var arreglos=[];

//Restaurante
// o Recibir pedido del cliente -  Post

router.post('/restaurante/recibir/pedido', [verify], function (req, res) {
  try {
    const {id} = req.user.client;
  const {productos} = req.body;

  var resultado={
    id,
    "estado": true,
    "estado_repartidor": true,
    productos,
"direccion": "28 calle zona 1 de Guatemala"
}
arreglos.push(resultado);

global.log.info(`pedido recibido`);
res.send(arreglos);

  } catch (error) {
    global.log.info(`pedido no recibido - ${error}`);


  }






});




// o Informar estado del pedido al cliente - Get
// {
//             "usuarioid": 10,
// 			"pedidoid": 9
// }


// o Avisar al repartidor que ya está listo el pedido - Post
// {
// 			"repartidorid": 78,
//             "pedidoid": 45
// }



// • Repartidor
// o Recibir pedido del restaurante - Get
// {
// 			"restauranteid": 78
// }

// o Informar estado del pedido al cliente - Post
// {
// 			"pedidoid": 45,
//             "clienteid": 12
// }

// o Marcar como entregado - put
// {
// 			"pedidoid": 45,
//             "status": "entregado"
// }












// export this router to use in our index.js
module.exports = router;
