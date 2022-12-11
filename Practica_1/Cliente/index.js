require('./loggger/logger');
require('dotenv').config();
const express = require('express')
const cors = require('cors');
var morgan = require('morgan')

const corsOptions = { origin: false, optionsSuccessStatus: 200 };

const app = express();
app.use(morgan('dev'));
app.use(express.json())
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
    'x-auth-token'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


const router = require('./router/router')
app.use('/', router)


app.listen(process.env.PORT, () => {
  //console.log(`Example app listening on port ${process.env.PORT}`)
  global.log.info(`API ejecutandose en el puerto ${process.env.PORT}`);

})
