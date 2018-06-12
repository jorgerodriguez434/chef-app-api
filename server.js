const express = require("express");
const app = express();
const { Dish } = require("./models");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const { CLIENT_ORIGIN } = require("./config");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const morgan = require("morgan");
app.use(morgan("common"));

const { DATABASE_URL } = require("./config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL);

app.get("/api/dishes", (req, res) => {
  console.log("Making a GET request");
  Dish.find().then(dishes => res.status(200).json(dishes));
});

app.post("/api/dishes", jsonParser, (req, res) => {
  const requiredFields = [
    "name",
    "type",
    "category",
    "ingredients",
    "hasGluten",
    "hasMeat",
    "hasDairy",
    "hasEgg",
    "glutenItems",
    "meatItems",
    "dairyItems",
    "eggItems"
  ];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  /*requiredFields.map(field => {
    if (!(field in req.body)) {
      const message = `Missing \'${field}\' in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  });  */

  console.log("Making a POST request");
  Dish.create({
    name: req.body.name,
    type: req.body.type,
    category: req.body.category,
    ingredients: req.body.ingredient,
    hasGluten: req.body.hasGluten,
    hasMeat: req.body.hasMeat,
    hasDairy: req.body.hasDairy,
    hasEgg: req.body.hasEgg,
    glutenItems: req.body.glutenItems,
    meatItems: req.body.meatItems,
    dairyItems: req.body.dairyItems,
    eggItems: req.body.eggItems
  })
    .then(dish =>
      res.status(201).json({
        message: dish
      })
    )
    .catch(err => console.log(err));
});

app.delete("/api/dishes/:id", (req, res) => {
  console.log("Making a DELETE request");
  Dish.findByIdAndRemove(req.params.id)
    .then(dish => {
      res.json({ message: "Dish has been deleted" });
      res.status(200).end();
    })
    .catch(err => console.log(err));
});



app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
module.exports = { app };
