const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require('../server')
const {TEST_DATABASE_URL} = require('../config');
const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
  return runServer(TEST_DATABASE_URL);
});

after(function() {
  return closeServer();
});


describe("API", function() {
  it("should return 200 on GET requests", function() {
    return chai
      .request(app)
      .get("/api/dishes")
      .then(function(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(200);
      });
  });

  /*it("should return 201 on POST requests", function() {
    return chai
      .request(app)
      .post("/api/dishes")
      .then(function(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(201);
      });
  }); */
}); //describe
