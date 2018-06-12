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
        name: "Blackhawk Burger",
        type: "Burger",
        category: "No meat",
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
        hasGluten: true,
        hasMeat: false,
        hasDairy: false,
        hasEgg: true,
        glutenItems: ["Bun"],
        meatItems: ["No meat"],
        dairyItems: ["No dairy"],
        eggItems: ["Parmesan mayo"]
      })
      .then(function(res) {
        expect(res).to.be.json;
        expect(res).to.have.status(201);
        expect(res.body.dish.name).to.equal("Blackhawk Burger");
        expect(res.body.dish.type).to.equal("Burger");
        expect(res.body.dish.category).to.equal("No meat");
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
        expect(res.body.dish.hasGluten).to.equal(true);
        expect(res.body.dish.hasMeat).to.equal(false);
        expect(res.body.dish.hasDairy).to.equal(false);
        expect(res.body.dish.hasEgg).to.equal(true);
        expect(res.body.dish.glutenItems).to.deep.equal(["Bun"]);
        expect(res.body.dish.meatItems).to.deep.equal(["No meat"]);
        expect(res.body.dish.dairyItems).to.deep.equal(["No dairy"]);
        expect(res.body.dish.eggItems).to.deep.equal(["Parmesan mayo"]);
      });
  }); //it



}); //describe
