const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  username: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports.Payment = Payment;
