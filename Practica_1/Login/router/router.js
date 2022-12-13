const express = require('express');
const router = express.Router();
const authenticate = require('../utils/authenticate')
const verify = require('../utils/checkAuth')

const clintes = [
  {
    id: 1,
    user: 'cliente1',
    pass: 'asdf'
  },
  {
    id: 2,
    user: 'cliente2',
    pass: 'zvcc'
  },{
    id: 5,
    user: 'cliente5',
    pass: 'asdf'
  }
];
const restaurantes = [
  {
    id: 1,
    user: 'rest1',
    pass: 'asdf'
  },
  {
    id: 4,
    user: 'rest4',
    pass: 'qwer'
  },
  {
    id: 7,
    user: 'rest7',
    pass: 'dfgh'
  }
];
const repartidores = [
  {
    id: 1,
    user: 'repa1',
    pass: 'asdf'
  },
  {
    id: 11,
    user: 'repa11',
    pass: 'jhgf'
  }
];



router.get('/', function (req, res) {
  res.send('Practica 1');
});

// create user
router.post('/cliente', function (req, res) {
  try {
    const {user, pass} = req.body;
    var result = clintes.filter(function (item) {
        return item.user === user && item.pass === pass;
      })

    if (result.length < 1) {
      global.log.info('Usuario o Contrasena incorrecto');
      return res.status(404).send('Usuario o Contrasena incorrecto');
    }

    result = result[0]
    global.log.info(`Usuario Cliente logueado con exito`);
    return res.send(authenticate.setToken(result).token);

  } catch (error) {
    global.log.error(error);
    res.status(500).send(error)
  }
});


router.post('/  ', function (req, res) {
  try {
    const {user, pass} = req.body;
    var result = restaurantes.filter(function (item) {
        return item.user === user && item.pass === pass;
      })

    if (result.length < 1) {
      global.log.info('Usuario o Contrasena incorrecto');
      return res.status(404).send('Usuario o Contrasena incorrecto');
    }

    result = result[0]
    global.log.info(`Usuario Restaurante logueado con exito`);
    return res.send(authenticate.setToken(result).token);

  } catch (error) {
    global.log.error(error);
    res.status(500).send(error)
  }
});


router.post('/repartidor', function (req, res) {
  try {
    const {user, pass} = req.body;
    var result = repartidores.filter(function (item) {
        return item.user === user && item.pass === pass;
      })

    if (result.length < 1) {
      global.log.info('Usuario o Contrasena incorrecto');
      return res.status(404).send('Usuario o Contrasena incorrecto');
    }

    result = result[0]
    global.log.info(`Usuario Repartidor logueado con exito`);
    return res.send(authenticate.setToken(result).token);

  } catch (error) {
    global.log.error(error);
    res.status(500).send(error)
  }
});


router.post('/token', function (req, res) {
  const user = {
    id: 4,
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


// export this router to use in our index.js
module.exports = router;
