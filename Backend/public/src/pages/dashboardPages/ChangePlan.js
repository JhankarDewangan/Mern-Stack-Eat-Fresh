import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import change from "../../css/dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import calculateChange from "../../daysPlan/calcChangePlan";
import updateCredits from "../../getData/updateCredits";
import updateMyPlan from "../../getData/updateMyPlan";
import getAllPlans from "../../getData/getAllPlans";
import LOGO from "../../images/LOGO.png";
import axios from "axios";
import getUser from "../../getData/getUser";
import { notify } from "../../alerts/toastify";
import sendMail from "../../getData/sendMail";
import {
  changePlanMessage,
  succesfulBuyCOD,
} from "../../messages/emailMessage";
import { changePlanSubject } from "../../messages/emailSubject";

let getLastPlan = getAllPlans.getLastPlan;
// if a user has a valid plan then only they come to this page, if a user has a valid plan the last
// plan was already stored in dashboard when the user goes through dashboard
let allPlans = [
  ["vegBasic", "Veg Basic"],
  ["vegPremium", "Veg Premium"],
  ["nonVegBasic", "Non Veg Basic"],
  ["nonVegPremium", "Non Veg Premium"],
];

function assignPlan(planType) {
  for (let i = 0; i < allPlans.length; i++) {
    if (planType === allPlans[i][0]) {
      return allPlans[i][1];
    }
  }
}

function ChangePlan() {
  let [chosenPlan, setChosenPlan] = useState("");
  let navigate = useNavigate();
  let plan = JSON.parse(localStorage.getItem("lastPlan"));
  let currentPlan = assignPlan(plan.selectedPlan);

  console.log(currentPlan);
  function handleChoose(e) {
    setChosenPlan(e.target.value);
    console.log(chosenPlan, " ---");
  }
  function handleProceed() {
    console.log("chosen plan is : " + chosenPlan);
    if (
      chosenPlan === "vegBasic" ||
      chosenPlan === "vegPremium" ||
      chosenPlan === "nonVegBasic" ||
      chosenPlan === "nonVegPremium"
    ) {
      localStorage.setItem("changePlan", chosenPlan);
      navigate("/dashboard/changePlan/changeProcess");
    } else {
      notify("Choose a plan for change");
    }
  }
  return (
    <>
      <TopNavbar />
      <div className={change.changeBody}>
        <div className={change.changeLeft}>
          <div className={change.changeCurrPlan}>
            <div className={change.changeCurrPlanLabel}>
              <p>Current Plan</p>
            </div>
            <div className={change.changeCurrPlanDisplay}>
              <p>{currentPlan}</p>
            </div>
          </div>
          <div className={change.changeText}>
            <h3 style={{ fontWeight: "bolder" }}> Let food be thy medicine </h3>
            <h3 style={{ fontWeight: "bolder" }}>
              {" "}
              thy <span style={{ color: "#519938" }}>medicine</span> shall be
              thy
              <span style={{ color: "orange" }}> food</span>{" "}
            </h3>
          </div>
        </div>
        <div className={change.changeRight}>
          <div className={change.changechoosePlanLabel}>
            <p>Choose Plans</p>
          </div>
          {allPlans.map((plan, index) => {
            return plan[1] !== currentPlan ? (
              <div className={change.changeAvlPlans}>
                {" "}
                <input
                  onClick={handleChoose}
                  type="radio"
                  id={index}
                  name="age"
                  value={plan[0]}
                />
                <label style={{ fontSize: "3vh" }} for={index}>
                  {plan[1]}
                </label>
              </div>
            ) : (
              ""
            );
          })}
          <div
            onClick={handleProceed}
            type="button"
            className={change.changeProceed}
          >
            <p>Proceed</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function ChangePlanProcess() {
  let navigate = useNavigate();
  let currCredits = localStorage.getItem("credits");
  let newChangedPlan = localStorage.getItem("changePlan");
  let assignNewPlan = assignPlan(newChangedPlan);
  let plan = JSON.parse(localStorage.getItem("lastPlan"));
  let currentPlan = assignPlan(plan.selectedPlan);
  let changeDetail = calculateChange(
    plan.selectedPlan,
    newChangedPlan,
    plan.end
  );
  async function handleCredits() {
    let user = await getUser(localStorage.getItem("username"));
    let result = await updateCredits(
      user._id,
      Number(changeDetail.amt) + Number(currCredits)
    );
    let data = await updateMyPlan(
      plan._id,
      plan.selectedPlan,
      newChangedPlan,
      changeDetail.pay,
      changeDetail.addToCredits
    );
    console.log("updated plan : ", data);
    console.log(result, "credits");
    localStorage.setItem("lastPlan", JSON.stringify(data));

    localStorage.setItem("credits", result);
    //toastify
    notify(`Plan succesfully changed`);
    let emailData = await sendMail(
      localStorage.getItem("username"),
      changePlanMessage(currentPlan, assignNewPlan),
      changePlanSubject()
    );
    console.log(emailData);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }
  async function handleCOD() {
    let data = await updateMyPlan(
      plan._id,
      plan.selectedPlan,
      newChangedPlan,
      changeDetail.pay,
      changeDetail.addToCredits
    );
    console.log("updated plan : ", await data);
    localStorage.setItem("lastPlan", JSON.stringify(data));

    let emailData = await sendMail(
      localStorage.getItem("username"),
      changePlanMessage(currentPlan, assignNewPlan),
      changePlanSubject()
    );
    notify(`Plan succesfully changed`);
    await sendMail(
      localStorage.getItem("username"),
      succesfulBuyCOD(changeDetail.amt),
      "Cash Payment for Plan Change"
    );
    console.log(emailData);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  }
  async function payOnline(amount) {
    let user = await getUser(localStorage.getItem("username"));
    let user_id = user._id;
    console.log(amount, "ok");
    let data = await updateMyPlan(
      plan._id,
      plan.selectedPlan,
      newChangedPlan,
      changeDetail.pay,
      changeDetail.addToCredits
    );
    console.log("updated plan : ", await data);
    let username = localStorage.getItem("username");
    localStorage.setItem("lastPlan", JSON.stringify(data));

    const {
      data: { key },
    } = await axios.get("http://www.localhost:3500/api/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:3500/api/checkout", {
      amount,
      user_id,
      username,
    });

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "EAT FRESH",
      description: "Food Meal Plan Service",
      image: LOGO,
      order_id: order.id,
      callback_url: "http://localhost:3500/api/paymentverification", // check
      prefill: {
        name: plan.name,
        email: localStorage.getItem("username"),
        contact: plan.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }
  // console.log(changeDetail);
  return (
    <>
      <TopNavbar />
      <div className={change.changeBody}>
        <div className={change.changeLeft}>
          <div className={change.changeCurrPlan}>
            <div className={change.changeCurrPlanLabel}>
              <p>Current Plan</p>
            </div>
            <div className={change.changeCurrPlanDisplay}>
              <p>{currentPlan}</p>
            </div>
          </div>
          <div className={change.changeText}>
            <h3 style={{ fontWeight: "bolder" }}> Let food be thy medicine </h3>
            <h3 style={{ fontWeight: "bolder" }}>
              {" "}
              thy <span style={{ color: "#519938" }}>medicine</span> shall be
              thy
              <span style={{ color: "orange" }}> food</span>{" "}
            </h3>
          </div>
        </div>
        <div className={change.changeRightParent}>
          <div className={change.changeProcessRight}>
            {changeDetail.pay === 0 ? (
              <div className={change.changechoosePlanLabel}>
                <p>Plan Downgrade</p>
              </div>
            ) : (
              <div className={change.changechoosePlanLabel}>
                <p>Plan Upgrade</p>
              </div>
            )}

            <div className={change.newChangedPlan}>
              <p>{assignNewPlan}</p>
            </div>
            <div className={change.changeAmt}>
              <p>Ammount : </p>
              <p>{changeDetail.amt}</p>
            </div>
            {changeDetail.pay === 0 ? (
              <div
                onClick={handleCredits}
                type="button"
                className={change.changeProceed}
              >
                <p>Add to Credits</p>
              </div>
            ) : (
              <div className={change.changePayment}>
                <div onClick={handleCOD} type="button">
                  <p>Cash</p>
                </div>
                <div
                  onClick={() => {
                    payOnline(changeDetail.amt);
                  }}
                  type="button"
                >
                  <p>Pay Online</p>
                </div>
              </div>
            )}
          </div>
          <i>*Note : Credits can't be used for change plan payments</i>
        </div>
      </div>
      <Footer />
    </>
  );
}

export { ChangePlan, ChangePlanProcess };
