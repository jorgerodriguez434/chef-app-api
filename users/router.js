const express = require("express");
const router = express.Router();

const { User } = require("./models");

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

router.get("/", (req, res) => {
  console.log("Making a GET request");
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
});

router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["username", "password", "firstName", "lastName"];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  console.log("Making a POST request");
  console.log(req.body);

  User.find().then(users => {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.username === req.body.username) {
        return res.status(400).send({ error: `username already exists!` });
      }
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
      .then(user => res.status(201).json(user.serialize()))
      .catch(err => console.log(err));
  });
});

module.exports = router;

/*users.forEach(user => {
                if (user.username === req.body.username){
                    return res.status(400).json({error: `username already exists!`})
                }
        });  */
