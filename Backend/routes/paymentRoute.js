require("dotenv").config({ path: "../.env" });
const express = require("express");
const paymentRoute = express.Router();
const crypto = require("crypto");
const Payment = require("../model/payment.js").Payment;
const Razorpay = require("razorpay");
const sendMail = require("../email.js").sendMail;

let user_id;
let username;
let message =
  "<h3>Your payment has succesfully been made, The changes will be reflected in your dashboard</h3>";
let subject = "Payment Succesful";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

const checkout = async (req, res) => {
  username = req.body.username;
  user_id = req.body.user_id;
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "receipt#1",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      user_id,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await sendMail(username, message, subject);
    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

paymentRoute.route("/checkout").post(checkout);

paymentRoute.route("/paymentverification").post(paymentVerification);

paymentRoute.get("/getTransactions/:user_id", async (req, res) => {
  let data = await Payment.find({ user_id: req.params.user_id });
  if (data[0]) {
    res.json(data);
  } else {
    res.json({
      message: "User has made no previous transactions",
      prevTransactions: 0,
    });
  }
});

// paymentRoute.post("/getTransactions", async (req, res) => {
//   console.log("hello");
//   username = req.body.username;
//   res.redirect("/api/getTransactions");
// });

module.exports.paymentRoute = paymentRoute;
