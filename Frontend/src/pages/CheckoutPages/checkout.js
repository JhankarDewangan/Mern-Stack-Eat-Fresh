import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import checkout from "../../css/checkout.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import getStartAndEnd from "../../daysPlan/startAndEnd";
import calculatePrice from "../../daysPlan/calPricing";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../Redux/actions/allActions";
import getUser from "../../getData/getUser";
import "../../css/styles.css";
import { notify } from "../../alerts/toastify";

let allPlans = [
  ["vegBasic", "Veg Basic"],
  ["vegPremium", "Veg Premium"],
  ["nonVegBasic", "Non Veg Basic"],
  ["nonVegPremium", "Non Veg Premium"],
];

function Checkout() {
  let arrayOfAddress = useSelector((state) => state.allAddress);
  let dispatch = useDispatch();
  let [selectedDays, setSelectedDays] = useState("7"); //setting state for selected Days
  let startAndEnd = getStartAndEnd(selectedDays); // getting start and end date
  let start = startAndEnd[0];
  let end = startAndEnd[1];
  // let ref = useRef(null);
  let navigate = useNavigate();
  let { planType } = useParams();
  // localStorage.setItem("selected_plan", planType); // setting initial selected plan
  // localStorage.setItem("selected_days", "7"); // setting initial  selected days

  let [selectedPlan, setSelectedPlan] = useState(planType);
  let charges = calculatePrice(selectedPlan, selectedDays); // getting prices based on selected fields

  useEffect(() => {
    console.log(selectedDays);
    startAndEnd = getStartAndEnd(selectedDays);
    charges = calculatePrice(selectedPlan, selectedDays);
    console.log(charges); // logging
    console.log(startAndEnd); // logging
    start = startAndEnd[0];
    end = startAndEnd[1];
  }, [selectedDays, selectedPlan]);

  async function handleClick() {
    if (localStorage.getItem("token")) {
      let user = await getUser(localStorage.getItem("username"));
      let allAddress = [];
      let response = await fetch(
        `http://localhost:3500/customer/address/getAddress/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          // body: new URLSearchParams({
          //   // what is this ??
          //   username: localStorage.getItem("username"),
          // }),
        }
      );
      if (response.status === 200) {
        allAddress = await response.json();
        console.log(allAddress);
        dispatch(allActions.setAll_Address(allAddress));
        console.log(arrayOfAddress, "got it");
        if (allAddress.savedAddress === 0) {
          navigate(`/plans/${planType}/checkout/address`);
        } else {
          localStorage.setItem("allAddress", JSON.stringify(allAddress));
          navigate(`/plans/${planType}/checkout/address`);
        }
      } else {
        console.log(response.status);
        dispatch(allActions.setAll_Address(allAddress));
        // localStorage.setItem("allAddress", allAddress);
        console.log(arrayOfAddress, "ok ok");
        // navigate();
      }
    } else {
      notify("You need to login first");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }

  return (
    <>
      <TopNavbar />
      <div className={checkout.body}>
        <div className={checkout.checkoutLeft}>
          <div className={checkout.planSelectCard}>
            <select
              onChange={(e) => {
                setSelectedDays(e.target.value);
                localStorage.setItem("selected_days", e.target.value);
                console.log(
                  "selected days is",
                  localStorage.getItem("selected_days")
                );
              }}
              // ref={ref}
              className="form-select daysDropDown"
              name="cars"
              id="days"
            >
              <option value="7">7 Days Plan</option>
              <option value="14">14 Days Plan</option>
              <option value="28">28 Days Plan</option>
              <option value="1"> custom 1 day</option>
              <option value="2"> custom 2 day</option>
              <option value="3"> custom 3 day</option>
              <option value="4"> custom 4 day</option>
              <option value="5"> custom 5 day</option>
              <option value="6"> custom 6 day</option>
            </select>
            <select
              onChange={(e) => {
                // console.log(e.target.value, "planooooooooooo");
                setSelectedPlan(e.target.value);
                localStorage.setItem("selected_plan", e.target.value);
                console.log(
                  "selected plan is",
                  localStorage.getItem("selected_plan")
                );
              }}
              className="form-select plansDropDown"
              name="cars"
              id="plans"
            >
              {allPlans.map((plan) => {
                if (plan[0] === planType) {
                  return (
                    <option selected value={plan[0]}>
                      {" "}
                      {/* adding selected field from urlParams */}
                      {plan[1]}
                    </option>
                  );
                } else {
                  return <option value={plan[0]}>{plan[1]}</option>;
                }
              })}
            </select>
          </div>
          {/* <div
            style={{ backgroundColor: "green" }}
            className={checkout.checkoutAddr}
          >
            <div type="button">
              <h3>Choose Address</h3>
            </div>
          </div> */}
        </div>
        <div className={checkout.checkoutRight}>
          <div className={checkout.checkoutPricingCard}>
            <div>
              <h3>Start Date :</h3>
              <h3>{start}</h3>
            </div>
            <div>
              {" "}
              <h3>End Date :</h3>
              <h3>{end}</h3>
            </div>
            <div>
              {" "}
              <h3>Total Pricing :</h3>
              <h3>{charges.total}</h3>
            </div>
            <div>
              <h3>Additional :</h3>
              <h3>{charges.additional}</h3>
            </div>
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              <h3>Sub Total Pricing :</h3>
              <h3>{charges.subtotal}</h3>
            </div>
          </div>
          <div
            // onClick={() => {
            //   navigate(`/plans/${planType}/checkout/address`);
            // }}
            onClick={handleClick}
            className={checkout.checkoutPayment}
          >
            <div type="button">
              <h3>Continue</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Checkout;
