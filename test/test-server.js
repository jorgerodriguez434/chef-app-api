const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");
const { TEST_DATABASE_URL } = require("../config");
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

  it("should return 201 on POST requests", function() {
    return chai
      .request(app)
      .post("/api/dishes")
      .send({
        name: "Captain America",
        categories: ["no-meat"],
        ingredients: [
          "Quinoa",
          "Mushroom",
          "Walnut",
          "Lettuce",
          "Tomato",
          "Pickled red onions",
          "Cucumber",
          "Parmesan mayo",
          "Bun"
        ],
        image: "image.jpg"
      })
      .then(function(res) {
        expect(res).to.be.json;
        expect(res.body.dish.name).to.equal("Captain America");
        expect(res.body.dish.categories).to.deep.equal(["no-meat"]);
        expect(res.body.dish.ingredients).to.deep.equal([
          "Quinoa",
          "Mushroom",
          "Walnut",
          "Lettuce",
          "Tomato",
          "Pickled red onions",
          "Cucumber",
          "Parmesan mayo",
          "Bun"
        ]);
        expect(res.body.dish.image).to.equal("image.jpg");
      });
  });

  it("should return 200 on DELETE requests", function() {
    return chai
      .request(app)
      .delete("/api/dishes/5b1f37eb22eeeec0c713deef")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Dish has been deleted");
      }).catch(err => console.log(err));
  });

  it("should update and return updated json object on PUT request with 200 status code", function() {
    return chai
      .request(app)
      .put("/api/dishes/5b1f37eb22eeeec0c713deef")
      .send({
        name: "Hulk",
        categories: ["meat"],
        ingredients: [
          "Quinoa",
          "Mushroom",
          "Walnut",
          "Lettuce",
          "Tomato",
          "Pickled red onions",
          "Cucumber",
          "Parmesan mayo",
          "Bun"
        ],
        image: "image.jpg"
      })
      .then(function(res) {
        expect(res).to.be.json;
        expect(res.body.dish.name).to.equal("Hulk");
        expect(res.body.dish.categories).to.deep.equal(["meat"]);
        expect(res.body.dish.ingredients).to.deep.equal([
          "Quinoa",
          "Mushroom",
          "Walnut",
          "Lettuce",
          "Tomato",
          "Pickled red onions",
          "Cucumber",
          "Parmesan mayo",
          "Bun"
        ]);
        expect(res.body.dish.image).to.equal("image.jpg");
      });
  });

}); //describe









