const express = require("express");
const router = express.Router();

const { Dish } = require("./models");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  console.log("Making a GET request");
  Dish.find().then(dishes => res.status(200).json(dishes));
});

router.post("/", jsonParser, (req, res) => {
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
    ingredients: req.body.ingredients,
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
        dish
      })
    )
    .catch(err => console.log(err));
});

router.delete("/:id", (req, res) => {
  console.log("Making a DELETE request");
  Dish.findByIdAndRemove(req.params.id)
    .then(dish => {
      res.json({ message: "Dish has been deleted" });
      res.status(200).end();
    })
    .catch(err => console.log(err));
});

router.put("/:id", jsonParser, (req, res) => {
  console.log("Making a PUT request");
  const id = req.params.id;
  Dish.findByIdAndUpdate(
    id,
    {
      $set: {
        name: req.body.name,
        type: req.body.type,
        category: req.body.category,
        ingredients: req.body.ingredients,
        hasGluten: req.body.hasGluten,
        hasMeat: req.body.hasMeat,
        hasDairy: req.body.hasDairy,
        hasEgg: req.body.hasEgg,
        glutenItems: req.body.glutenItems,
        meatItems: req.body.meatItems,
        dairyItems: req.body.dairyItems,
        eggItems: req.body.eggItems
      }
    },
    { upsert: true, new: true }
  )
    .then(data => {
      Dish.findById(data._id, (error, dish) => res.status(200).json(dish));
    })
    .catch(err => console.log(err));
});

module.exports = router;
