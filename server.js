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
  res.json({ status: "success!" });
});

app.post("/api/dishes", jsonParser, (req, res) => {
  const {
    name,
    type,
    category,
    ingredients,
    hasGluten,
    hasMeat,
    hasDairy,
    hasEgg,
    glutenItems,
    meatItems,
    dairyItems,
    eggItems
  } = req.body;
  const isAnyPropertyMissing =
    !name ||
    !type ||
    !category ||
    !ingredients ||
    !hasGluten ||
    !hasMeat ||
    !hasDairy ||
    !hasEgg ||
    !glutenItems ||
    !meatItems ||
    !dairyItems ||
    !eggItems;

  if (isAnyPropertyMissing) {
    console.log("All fields are required!");
    return res.status(400).json({ Message: "All fields are required!" });
  }

  console.log("making a POST request");
  Dish.create({
    name,
    type,
    category,
    ingredient,
    hasGluten,
    hasMeat,
    hasDairy,
    hasEgg,
    glutenItems,
    meatItems,
    dairyItems,
    eggItems
  })
    .then(dish =>
      res.status(201).json({
        message: dish
      })
    )
    .catch(err => console.log(err));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
