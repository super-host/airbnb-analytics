const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/view', (req, res) ={
  
});

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 8000!');
});

module.exports = server;
