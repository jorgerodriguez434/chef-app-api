const express = require("express");
const router = express.Router();

const { Dish } = require("./models");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const passport = require('passport');
const { localStrategy, jwtStrategy } = require('./auth');
passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', { session: false });
//router.use(jwtAuth);

router.get("/",  (req, res) => {
  console.log("Making a GET request");
  Dish.find().then(dishes => res.status(200).json(dishes))
  .catch(err => console.log(err));
});

router.post("/", jsonParser, (req, res) => {
  const requiredFields = [
    "name",
    "ingredients",
  ];

  if (req.body.ingredients.length === 0) res.status(400).json({message: "you must enter at least 1 ingredient!"})

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  console.log("Making a POST request");
  //console.log(req.body);
  Dish.create({
    name: req.body.name,
    ingredients: req.body.ingredients,
    categories: req.body.categories,
    image: req.body.image
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
    .then(() => {
      res.json({ message: `Dish has been deleted` });
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
        ingredients: req.body.ingredients,
        categories: req.body.categories,
        image:req.body.image
      }
    },
    { upsert: true, new: true }
  )
    .then(dish => {
      //console.log(dish);
      res.json({
        dish
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
