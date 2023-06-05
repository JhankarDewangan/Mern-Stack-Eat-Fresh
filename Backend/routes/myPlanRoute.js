const express = require("express");
const myPlan = express.Router();
const MyPlan = require("../model/myPlan").MyPlan;

let username;

myPlan.post("/", async (req, res) => {
  let newPlan = new MyPlan();
  console.log(req.body);
  if (req.body.user_id) {
    newPlan.user_id = req.body.user_id;
    newPlan.name = req.body.name;
    newPlan.phone = req.body.phone;
    newPlan.selectedPlan = req.body.selectedPlan;
    newPlan.selectedDays = req.body.selectedDays;
    newPlan.address = req.body.address;
    newPlan.start = req.body.start;
    newPlan.end = req.body.end;
    newPlan.total = req.body.total;
    newPlan.additional = req.body.additional;
    newPlan.subtotal = req.body.subtotal;
    newPlan.creditsUsed = req.body.creditsUsed;
    let response = await newPlan.save();
    res.status(200).json({ myPlan: response, success: true });
  } else {
    res
      .status(400)
      .json({ messasge: "Missing required field", success: false });
  }
});

myPlan.get("/getmyPlan/:userid", async (req, res) => {
  let data = await MyPlan.find({ user_id: req.params.userid });
  if (data[0]) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ message: "User has no saved plans", plans: 0 });
  }
});

// myPlan.post("/getmyPlan", (req, res) => {
//   // console.log("hello");
//   username = req.body.username;
//   res.redirect("/customer/myPlan/getmyPlan");
// });

myPlan.put("/updatePlan", async (req, res) => {
  let date = new Date();
  let curr =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  await MyPlan.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        selectedPlan: req.body.changePlan,
        planChangeFrom: req.body.oldPlan,
        planChangePay: req.body.pay,
        planChangeDate: curr,
        planChangeCredits: req.body.addToCredits,
      },
    }
  );

  let result = await MyPlan.find({ _id: req.body.id });
  res.json(result);
});
//
// myPlan.post("/getmyPlan", (req, res) => {
//   console.log("aaaa");
//   username = req.body.username;
//   res.redirect("/customer/myPlan/getmyPlan");
// });

// meal - (Lunch/breakfast/dinner) & day - 0 /// meal - 0(no meal change) & day - 1

myPlan.put("/updateCancelPlan", async (req, res) => {
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let { meal, day } = req.body;
  let nextDay =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if (meal == 0) {
    await MyPlan.findOneAndUpdate({ _id: req.body.id }, { cancelDay: nextDay });
  } else {
    cancelMeal = nextDay + "/" + meal;
    await MyPlan.findOneAndUpdate(
      { _id: req.body.id },
      { cancelMeal: cancelMeal }
    );
  }
  let result = await MyPlan.find({ _id: req.body.id });
  res.json(result);
});

module.exports.myPlan = myPlan;
