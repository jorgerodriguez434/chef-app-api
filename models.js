const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({

  name: String,
  type: String,
  category: String,
  ingredients: Array,
  hasGluten: Boolean,
  hasMeat: Boolean,
  hasDairy: Boolean,
  hasEgg: Boolean,
  glutenItems: Array,
  meatItems: Array,
  dairyItems: Array,
  eggItems: Array,

});


const Dish = mongoose.model('Dish', dishSchema);
module.exports = Dish
