import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import cancel from "../../css/settings.module.css";
import getAllPlans from "../../getData/getAllPlans";
import LOGO from "../../images/LOGO_Tagline.png";
import { useState } from "react";
import "../../css/styles.css";
import updateCredits from "../../getData/updateCredits";
import { updateCancelPlan } from "../../getData/updateCancelPlan";
import { useNavigate } from "react-router-dom";
import getUser from "../../getData/getUser";
import { notify } from "../../alerts/toastify";
import sendMail from "../../getData/sendMail";
import { cancelSubject } from "../../messages/emailSubject";
import {
  cancelDayMessage,
  cancelMealMessge,
} from "../../messages/emailMessage";

let getLastPlan = getAllPlans.getLastPlan;

let pricing = {
  vegBasic: 130,
  vegPremium: 170,
  nonVegBaisc: 150,
  nonVegPremium: 200,
};

function Cancellation() {
  let navigate = useNavigate();
  let [selectedMeal, setSelectedMeal] = useState("Breakfast");
  let currCredits = localStorage.getItem("credits");
  console.log(currCredits);
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let nextDay =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  let plan = JSON.parse(localStorage.getItem("lastPlan"));
  let selectedPlan = plan.selectedPlan;
  let creditsForDay = pricing[selectedPlan];
  let creditsForMeal = Math.trunc(pricing[selectedPlan] / 3);
  async function handleDayProceed() {
    console.log("hello");
    let credits = Number(currCredits) + Number(creditsForDay);
    let user = await getUser(localStorage.getItem("username"));
    let updated = await updateCredits(user._id, credits);
    localStorage.setItem("credits", updated);
    let result = await updateCancelPlan(plan._id, 1, 0);
    console.log(result);
    console.log(updated);
    notify(`Your credits credited by ${creditsForDay}`);
    await sendMail(
      localStorage.getItem("username"),
      cancelDayMessage(nextDay),
      cancelSubject()
    );
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }
  async function handleMealProceed() {
    let credits = Number(currCredits) + Number(creditsForMeal);
    let user = await getUser(localStorage.getItem("username"));
    let updated = await updateCredits(user._id, credits);
    localStorage.setItem("credits", updated);
    let result = await updateCancelPlan(plan._id, 0, selectedMeal);
    console.log(result);
    console.log(updated);
    notify(`Your credits credited by ${creditsForMeal}`);

    await sendMail(
      localStorage.getItem("username"),
      cancelMealMessge(nextDay, selectedMeal),
      cancelSubject()
    );
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }
  return (
    <>
      <TopNavbar />
      <div className={cancel.cancelBody}>
        <div className={cancel.cancelLeft}>
          <img style={{ height: "38.5vh" }} src={LOGO} />
          <div>
            <h3 style={{ fontWeight: "bolder" }}>
              Don't
              <span style={{ color: "#519938" }}> Panic </span>{" "}
            </h3>
            <h3 style={{ fontWeight: "bolder" }}>
              Save Money, Get Credits for
            </h3>
            <h3>
              <span style={{ color: "orange" }}> Cancellations</span>
            </h3>
          </div>
        </div>
        <div className={cancel.cancelRight}>
          <div>
            <div className={cancel.cancelDayCard}>
              <div className={cancel.cancelDayLabel}>
                <p>Cancel Day</p>
              </div>
              <div className={cancel.cancelDay}>
                <p>{nextDay}</p>
              </div>
              <div
                onClick={handleDayProceed}
                className={cancel.cancelDayProceed}
              >
                <p>Proceed</p>
              </div>
            </div>
            <div className={cancel.cancelMealCard}>
              <div className={cancel.cancelMealLabel}>
                <p>Cancel Meal</p>
              </div>
              <div className={cancel.cancelMealDay}>
                {" "}
                <p>{nextDay}</p>
              </div>
              <select
                onChange={(e) => {
                  setSelectedMeal(e.target.value);
                }}
                // ref={ref}
                className="form-select mealsDropDown"
                name="cars"
                id="meals"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
              <div
                onClick={handleMealProceed}
                className={cancel.cancelMealProceed}
              >
                <p>Proceed</p>
              </div>
            </div>
          </div>
          <p>
            <i>*Cancellations need to be made atleast one day prior</i>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cancellation;
