const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { routes } = require('../utils');
const compression = require('compression');
const routers = require('../routers');
const apiKey = require('../midleware/apiKey');

const PORT = process.env.PORT || 3001;
const app = express();
const { dataRouter, iconsRouter } = routers;

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(apiKey);

app.get('/', (req, res) => {
  res.send({
    hello: 'Welcome to the API, please make a request'
  });
});


routes.forEach(route => {
  app.use(route.path, dataRouter(route.collection));
});

app.use('/icons', iconsRouter('Icons'));


app.use((req, res, next) => {
  res.status(500).send({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server not working');
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
