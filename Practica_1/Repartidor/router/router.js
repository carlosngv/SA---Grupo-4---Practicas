const express = require('express');
const { recibirPedido, informarCliente } = require('../controllers/repartidor.controller');
const router = express.Router();
const authenticate = require('../utils/authenticate')
const verify = require('../utils/checkAuth')


router.get('/', function (req, res) {
  res.send('Microservicio de Repartidor');
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


router.post('/prueba1', [verify], function (req, res){
  const {id} = req.user.client;
  res.send(`${id}`);
});


/* Ejemplo
    POST http://localhost:3040/repartidor/recibir

    BODY:
    {
        repartidorID: 12,
        pedidoID: 23
    }
*/
router.post('/repartidor/recibir', [verify], recibirPedido);

/* Ejemplo
    GET http://localhost:3040/repartidor/informar_cliente
*/
router.get('/repartidor/informar_cliente', [verify], informarCliente);



// export this router to use in our index.js
module.exports = router;
