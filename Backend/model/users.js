const mongoose = require("mongoose");
const { use } = require("passport");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { PassportLocalSchema } = require("mongoose");
const { Schema } = mongoose;
const findOrCreate = require("mongoose-findorcreate");

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  googleId: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("user", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema;
