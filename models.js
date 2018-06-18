const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({

  name: String,
  type: String,
  categories: Array,
  ingredients: Array,
  created: {type: Date, default: Date.now}

});

const Dish = mongoose.model('Dish', DishSchema);
module.exports = {Dish};
