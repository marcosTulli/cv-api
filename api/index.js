const express = require('express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const createRouter = require('../routers/router');
const compression = require('compression');
const routes = require('../routers/routes');
const apiKey = require('../midleware/apiKey');

const PORT = process.env.PORT || 3001;
const app = express();

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
  app.use(route.path, createRouter(route.collection));
});

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
