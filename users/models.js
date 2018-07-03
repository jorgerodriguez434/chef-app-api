const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  created: { type: Date, default: Date.now }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName
  };
};

const User = mongoose.model("User", UserSchema);
module.exports = { User };