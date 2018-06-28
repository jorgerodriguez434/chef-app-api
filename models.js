const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({

  name: String,
  ingredients: Array,
  categories: Array,
  image: String,
  created: {type: Date, default: Date.now}

});

const Dish = mongoose.model('Dish', DishSchema);
module.exports = {Dish};
