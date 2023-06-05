const mongoose = require("mongoose");
const { Schema } = mongoose;

let myPlanSchema = mongoose.Schema({
  user_id: String,
  username: String,
  name: String,
  phone: String,
  selectedPlan: String,
  selectedDays: String,
  start: String,
  end: String,
  address: String,
  total: Number,
  additional: Number,
  subtotal: Number,
  creditsUsed: Number,
  planChangeFrom: String,
  planChangeDate: String,
  planChangePay: Number, // +ve means user paid , -ve means user recieved credits
  planChangeCredits: Number,
  cancelDay: String, // for cancellation feature
  cancelMeal: String, // for cancellation featur
});

const MyPlan = mongoose.model("myplan", myPlanSchema);

module.exports.MyPlan = MyPlan;
//
