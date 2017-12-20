require('newrelic');
const http = require('http');
const qs = require('querystring');
const db = require('../database/index.js');

const header = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json', // Seconds.
};

const app = http.createServer((req, res) => {
  let body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    body = JSON.parse(body);
    if (req.method === 'POST') {
      if (req.url === '/view') {
        processUpdate(body, res)
      } else if (req.url === '/booking') {
        addBookCount(body, res);
      }
    }
  });
});

async function processUpdate(data, res) {
  let cont = await db.manageView(data);
  res.writeHead(200, header);
  res.end();
}

async function addBookCount(data, res) {
  let cont = await db.addBookCount(data);
  res.writeHead(200, header);
  res.end();
}

app.listen(8000, '127.0.0.1');
module.exports = app;

