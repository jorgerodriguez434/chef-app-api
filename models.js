const mongoose = require("mongoose");

const DishSchema = mongoose.Schema({
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
  created: { type: Date, default: Date.now }
});

const Dish = mongoose.model("Dish", DishSchema);
module.exports = { Dish };
