require('newrelic');
// const apm = require('elastic-apm-node').start({
//   // Set required app name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
//   appName: 'airbnb-analytics',

//   // Set custom APM Server URL (default: http://localhost:8200)
//   serverUrl: 'http://localhost:8200',
// });
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const elastic = require('../elasticsearch');
const compression = require('compression');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(compression());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/view', (req, res, next) => {
  db.manageView(req.body)
    .then(() => {
      res.send('Success');
    })
    .catch(next);
});

app.post('/booking', (req, res) => {
  db.addBookCount(req.body)
    .then(() => {
      res.send('Success');
    })
    .catch((err) => {
      res.send('error message is', err);
    });
});


// app.use((err, req, res, next) => {
//   //error handling
//   res.send('Request failed!');
// });

router.get('/suggest/:input', (req, res, next) => {
  elastic.getSuggestions(req.params.input)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  elastic.addDocument(req.body)
    .then((result) => {
      res.json(result);
    });
});


const server = app.listen(PORT, () => {
  console.log('App listening on port 8000!');
});


module.exports = server;
