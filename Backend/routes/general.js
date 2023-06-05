const express = require("express");
const public_users = express.Router();
const User = require("../model/users").User;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { MyPlan } = require("../model/myPlan");

let username;
let jwtSecret = process.env.JWT_SECRET;

public_users.post("/signup", async (req, res) => {
  console.log("signup route", req.body);
  username = req.body.username;
  console.log(req.body);
  User.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.json({ message: err.message, success: false });
      } else {
        passport.authenticate("local")(req, res, function () {
          // console.log("hellosss");
          // console.log(req.user);
          res.redirect("/successregister");
        });
      }
    }
  );
});

public_users.get("/successregister", (req, res) => {
  console.log(username, "succesregister");
  let data = {
    username: username,
  };
  let accessToken = jwt.sign(data, jwtSecret);
  console.log(accessToken);
  console.log("123");
  res.status(200).json({
    message: "User registered",
    success: true,
    authToken: accessToken,
  });
});

public_users.get("/getUsers/:username", async (req, res) => {
  let username = req.params.username;
  let result = await User.find({ username: username });
  res.json(result);
});

public_users.put("/updateName", async (req, res) => {
  let { name, username } = req.body;
  await User.findOneAndUpdate({ username: username }, { name: name });
  let response = await User.find({ username: username });
  res.status(200).json(response);
});

public_users.put("/updateEmail", async (req, res) => {
  let { email, username } = req.body;
  await User.findOneAndUpdate({ username: username }, { username: email });
  let response = await User.find({ username: email });
  res.status(200).json(response);
});

public_users.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

public_users.get(
  "/auth/google/plans",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/plans",
    failureRedirect: "/failregister",
  }),
  (req, res) => {
    res.status(200).json({
      message: "User registered",
      success: true,
    });
  }
);

public_users.get("/failregister", (req, res) => {
  res.status(200).json({
    message: "User not registered",
    success: false,
  });
});

// public_users.post("/getUsers", async (req, res) => {
//   username = req.body;
//   // await User.findOneAndUpdate({ username: username }, { name: name });
//   let response = await User.find({ username: username });
//   res.json(response);
// });

// public_users.put("/updateEmail", async (req, res) => {
//   let { email, username } = req.body;
//   console.log(credits, username);
//   await MyPlan.findOneAndUpdate({ username: username }, { username : email });
//   let response = await Credit.find({ username: username });
//   res.json(response);
// });

module.exports.general = public_users;

// city , state , pincode , floor(optional) , landmark , detailed
