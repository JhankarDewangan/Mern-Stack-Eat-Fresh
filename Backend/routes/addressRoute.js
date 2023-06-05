const express = require("express");
const addr = express.Router();
const Address = require("../model/address").Address;

let username;

addr.get("/getAddress/:user_id", async (req, res) => {
  let data = await Address.find({ user_id: req.params.user_id });
  if (data[0]) {
    res.json(data);
  } else {
    res.json({ message: "User has no saved addresses", savedAddress: 0 });
  }
});

addr.post("/getAddress", (req, res) => {
  username = req.body.username;
  res.redirect("/customer/address/getAddress");
});

addr.post("/", async (req, res) => {
  const { user_id, saveAs, city, floor, landmark, detailed, pincode } =
    req.body;
  if (user_id && saveAs) {
    let address = new Address();
    address.user_id = user_id;
    address.city = city;
    address.saveAs = saveAs;
    address.floor = floor;
    address.landmark = landmark;
    address.detailed = detailed;
    address.pincode = pincode;
    let response = await address.save();
    res.status(200).json({ address: response, success: true });
  } else {
    res.status(400).json({ message: "Missing required field" });
  }
});
module.exports.addr = addr;
