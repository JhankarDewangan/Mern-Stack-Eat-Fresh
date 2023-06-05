const mongoose = require("mongoose");
const { Schema } = mongoose;

let creditSchema = mongoose.Schema({
  user_id: { type: String, unique: true, required: true },
  credits: Number,
});

const Credit = mongoose.model("credit", creditSchema);

module.exports.Credit = Credit;
