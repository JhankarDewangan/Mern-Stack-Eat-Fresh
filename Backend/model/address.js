const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = mongoose.Schema({
  user_id: String,
  saveAs: String,
  username: String,
  floor: String,
  detailed: String, // Complete Address
  landmark: String,
  city: String,
  pincode: Number,
});

const Address = mongoose.model("address", addressSchema);

module.exports.Address = Address;
