const express = require('express');
const app = express();
const {Dish} = require('./models');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
app.use(morgan('common'));

const {DATABASE_URL} = require('./config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(DATABASE_URL);

app.get('/api/dishes', (req, res) => {
  res.json({status: "success!"});
});

app.post('/api/dishes', jsonParser, (req, res) => {

		const reqBody = req.body;
		/*const isAnyPropertyMissing = !(reqBody.name || reqBody.type || reqBody.category
    || reqBody.ingredients || reqBody.hasGluten || reqBody.hasMeat || reqBody.hasDairy
    || reqBody.hasEgg || reqBody.glutenItems || reqBody.meatItems || reqBody.dairyItems
    || reqBody.eggItems); */

		/*if(isAnyPropertyMissing) {
				console.log('All fields are required!');
  				return res.status(400).json({ error: "All fields are required!" });
		} */

      console.log('making a POST request');
       Dish.create({

          name: reqBody.name,
          type: reqBody.type,
          category: reqBody.category,
          ingredients: reqBody.ingredients,
          hasGluten: reqBody.hasGluten,
          hasMeat: reqBody.hasMeat,
          hasDairy: reqBody.hasDairy,
          hasEgg: reqBody.hasEgg,
          glutenItems: reqBody.glutenItems,
          meatItems: reqBody.meatItems,
          dairyItems: reqBody.dairyItems,
          eggItems: reqBody.eggItems


        }).then(dish => res.status(201).json({
          message: dish
        })).catch(err => console.log(err));


        /*.then(data => {
          Playlist.findById(data._id, (error, song) => res.status(201).json(song.serialize()));
        })
        .catch(err => console.log(err)); */

});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};


//https://infinite-cove-16211.herokuapp.com/
//http://cocky-lumiere-0ee1f1.netlify.com/




/*

{
   "name": "Blackhawk Burger",
   "type": "Burger",
   "category": "no-meat",
   "ingredients": [
      "Quinoa",
      "Mushroom",
      "Walnut",
      "Lettuce",
      "Tomato",
      "Pickled_red_onions",
      "Cucumber",
      "Parmesan_mayo",
      "Bun"
   ],
   "hasGluten": true,
   "hasMeat": false,
   "hasDairy": false,
   "hasEgg": true,
   "glutenItems": [
      "BUN"
   ],
   "meatItems": [
      "no meat"
   ],
   "dairyItems": [
      "no dairy"
   ],
   "eggItems": [
      "parmesan mayo"
   ]
}

*/
