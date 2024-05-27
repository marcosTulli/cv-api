const express = require('express');
require('dotenv').config();
const router = require('./routers/router');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send({ title: 'Welcome', data: ['a', 'b', 'c'] });
});

app.use('/users', router);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} `);
});