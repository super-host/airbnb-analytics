const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const server = app.listen(PORT, () => {
  console.log('Example app listening on port 8000!');
});

module.exports = server;
