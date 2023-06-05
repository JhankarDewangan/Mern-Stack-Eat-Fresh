const express = require("express");
const creditRouter = express.Router();
const Credit = require("../model/credits").Credit;

let username;

creditRouter.post("/createCredits", async (req, res) => {
  // creating credits for a user
  console.log("recieved request");
  const { user_id } = req.body;
  let newCredit = new Credit();
  newCredit.user_id = user_id;
  newCredit.credits = 0;
  newCredit
    .save()
    .then((response) => {
      console.log("saved");
      res.status(200).json({ credits: response, success: true });
    })
    .catch((err) =>
      res.json({ err: err, message: "Credits exist for this username" })
    );
});

// creditRouter.post("/create", async (req, res) => {
//   let { user_id } = req.body;
//   let newCredit = new Credit();
//   newCredit.user_id = user_id;
//   newCredit.credits = 0;
//   Promise.all([newCredit])
//     .then(() => {
//       newCredit.save();
//     })
//     .catch((err) => {
//       console.log(err); // this now returns the error object I was looking for!!
//     });
//   let response = await Credit.find({ user_id: user_id });
//   res.json({ message: response });
// });

// creditRouter.post("/getCredits", async (req, res) => {
//   // storing username redirecting to getCredits route
//   username = req.body.username;
//   res.redirect("/customer/credits/getCredits");
// });

creditRouter.get("/getCredits/:user_id", async (req, res) => {
  // route for getting user credits
  let data = await Credit.find({ user_id: req.params.user_id });
  if (data[0]) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ message: "User has no saved credits" });
  }
});

creditRouter.put("/updateCredits", async (req, res) => {
  let { credits, user_id } = req.body;
  console.log(credits, user_id);
  await Credit.findOneAndUpdate({ user_id: user_id }, { credits: credits });
  let response = await Credit.find({ user_id: user_id });
  res.json(response);
});

module.exports.creditRouter = creditRouter;
