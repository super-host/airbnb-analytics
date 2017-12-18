// require('why-is-node-running');
const expect = require('chai').expect;
const server = require('../server/server.js');
const request = require('supertest');

//before 
describe('Server tests', () => {
  it('Should return a status code of 200 for a GET request to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('should return a status code of 404 for all other GET requests', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });

  it('Should return a status code of 404 for all other POST requests', (done) => {
    request(server)
      .post('/foo/bar')
      .expect(404, done);
  });

  it('Should return a status code of 404 for a GET request to /search without parameters', (done) => {
    request(server)
      .get('/search')
      .expect(404, done);
  });
});

// After all tests are finished drop database and close connection
after(() => {
  server.close();
});
