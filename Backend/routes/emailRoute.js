const express = require("express");
const email_route = express.Router();
const sendMail = require("../email").sendMail;

email_route.post("/", async (req, res) => {
  console.log("hello");
  let result = await sendMail(req.body.email, req.body.html, req.body.subject);
  res.json(result);
});

module.exports.email_route = email_route;
