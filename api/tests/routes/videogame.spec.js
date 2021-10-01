const supertest = require("supertest");
var request = require('supertest');
const app = require('../../src/app.js');

describe("GET /genres", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/genres")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("GET /videogame/:ID", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/videogame/11")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("GET /videogames?name=", function() {
  it("it should has status code 200", function(done) {
    supertest(app)
      .get("/videogames?name=cars")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("GET /wrong page", function() {
  it("it should has status code 404", function(done) {
    supertest(app)
      .get("/genr")
      .expect(404)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

describe("POST /videogame", function() {
  it('should respond with status 200', function(done) {
    request(app)
      .post('/videogame')
      .send({"name":"Emmanuel"})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) done(err);

      });
      done();
  });
});