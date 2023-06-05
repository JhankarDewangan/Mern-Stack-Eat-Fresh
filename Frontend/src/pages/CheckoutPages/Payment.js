import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import getStartAndEnd from "../../daysPlan/startAndEnd";
import calculatePrice from "../../daysPlan/calPricing";
import checkout from "../../css/checkout.module.css";
import { useState } from "react";
import axios from "axios";
import updateCredits from "../../getData/updateCredits";
import getUser from "../../getData/getUser";
import LOGO from "../../images/LOGO.png";
import { notify } from "../../alerts/toastify";
import sendMail from "../../getData/sendMail";
import { succesfulBuyCOD } from "../../messages/emailMessage";

function digits_count(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
}

function Payment() {
  let [credits, setCredits] = useState(localStorage.getItem("credits"));
  // console.log(localStorage.getItem("tempCredits"), "tempCredits");
  let navigate = useNavigate();
  let [userDetail, setuserDetail] = useState({
    name: "",
    phone: "",
  });

  function handleChange(e) {
    setuserDetail({ ...userDetail, [e.target.name]: e.target.value });
    console.log(userDetail);
  }
  let selectedPlan, selectedDays;
  let { planType } = useParams();
  let address = JSON.parse(localStorage.getItem("selected_address"));
  console.log("selected Address :", address);

  if (localStorage.getItem("selected_plan")) {
    selectedPlan = localStorage.getItem("selected_plan");
    console.log("Selected Plan : ", selectedPlan);
  } else {
    localStorage.setItem("selected_plan", planType);
    selectedPlan = localStorage.getItem("selected_plan");
    console.log(" Default Selected Plan : ", selectedPlan);
  }
  if (localStorage.getItem("selected_days")) {
    selectedDays = localStorage.getItem("selected_days");
    console.log("Selected Days : ", selectedDays);
  } else {
    localStorage.setItem("selected_days", "7");
    selectedDays = localStorage.getItem("selected_days");
    console.log("Default Selected Days : ", selectedDays);
  }
  let startAndEnd = getStartAndEnd(selectedDays);
  let start = startAndEnd[0];
  let end = startAndEnd[1];
  let charges = calculatePrice(selectedPlan, selectedDays);
  let [subtotal, setSubtotal] = useState(charges.subtotal);

  async function handleCreditsUse() {
    let allTotal = subtotal;
    let allCredits = credits;
    if (allTotal > allCredits) {
      allTotal = allTotal - allCredits;
      setCredits(0);
      setSubtotal(allTotal);
    } else {
      allCredits = allCredits - allTotal;
      setSubtotal(1);
      setCredits(allCredits + 1);
    }
    // localStorage.setItem("tempCredits", credits);
    // console.log(localStorage.getItem("tempCredits"), "tempcredits");
  }
  async function handleCOD() {
    if (digits_count(userDetail.phone) !== 10) {
      notify("enter a valid number");
      return;
    }
    if (userDetail.name.length < 3) {
      notify("Please enter the input fields");
      return;
    }

    let user = await getUser(localStorage.getItem("username"));
    let updated = await updateCredits(user._id, credits);
    console.log(updated);
    let response = await fetch("http://localhost:3500/customer/myPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_id: user._id,
        name: userDetail.name,
        phone: userDetail.phone,
        start: start,
        end: end,
        selectedPlan: selectedPlan,
        selectedDays: selectedDays,
        address: `${address.saveAs} , ${address.floor}, ${address.detailed} , ${address.landmark}
      , ${address.city} - ${address.pincode}`,
        total: charges.total,
        additional: charges.additional,
        subtotal: subtotal,
        creditsUsed: charges.total + charges.additional - subtotal,
      }),
    });
    if (response.status === 200) {
      let data = await response.json();
      console.log("success :", data);
      await sendMail(
        localStorage.getItem("username"),
        succesfulBuyCOD(subtotal),
        "Cash Payment for New Plan"
      );
      navigate("/ordersuccess");
    }
  }
  const checkoutHandler = async (amount) => {
    console.log(userDetail.phone.length);
    if (digits_count(userDetail.phone) !== 10) {
      notify("enter a valid number");
      return;
    }
    if (userDetail.name.length < 3) {
      notify("Please enter the input fields");
      return;
    }

    let user = await getUser(localStorage.getItem("username"));
    let updated = await updateCredits(user._id, credits);
    console.log(updated);
    let user_id = user._id;
    let response = await fetch("http://localhost:3500/customer/myPlan", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_id: user._id,
        name: userDetail.name,
        phone: userDetail.phone,
        start: start,
        end: end,
        selectedPlan: selectedPlan,
        selectedDays: selectedDays,
        address: `${address.saveAs} , ${address.floor}, ${address.detailed} , ${address.landmark}
      , ${address.city} - ${address.pincode}`,
        total: charges.total,
        additional: charges.additional,
        subtotal: subtotal,
        creditsUsed: charges.total + charges.additional - subtotal,
      }),
    });
    if (response.status === 200) {
      let data = await response.json();
      console.log("success :", data);
    }
    const username = localStorage.getItem("username");
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
        name: userDetail.name,
        email: localStorage.getItem("username"),
        contact: userDetail.phone,
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
    // razor.createPayment(options);
  };

  return (
    <>
      <TopNavbar />
      <div className={checkout.body}>
        <div className={checkout.leftPayment}>
          <div className={checkout.orderSummary}>
            <h3>ORDER SUMMARY</h3>
          </div>
          <div className={checkout.summaryCard}>
            <div>
              <p>Start Date :</p> <p>{start}</p>
            </div>
            <div>
              <p>End Date :</p>
              <p>{end}</p>
            </div>
            <div>
              <p>Selected Plan :</p>
              <p>{selectedPlan} </p>
            </div>
            <div>
              <p>Selected Days :</p>

              <p>{selectedDays}</p>
            </div>
            <div style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              <p>Sub Total :</p>
              <p>{subtotal}</p>
            </div>
          </div>
          <div className={checkout.addressCard}>
            <span>{address.saveAs}</span>
            <span>
              {address.floor} , {address.detailed} ,
            </span>
            <span>
              {address.landmark} , {address.city} - {address.pincode}
            </span>
          </div>
        </div>
        <div className={checkout.rightPayment}>
          <div className={checkout.creditsCheckout}>
            <div className={checkout.credits}>
              <div className={checkout.creditsLabel}>
                <span>Credits</span>
              </div>
              <div className={checkout.creditsDisplay}>
                <span>INR {credits}</span>
              </div>
            </div>
            <div
              onClick={handleCreditsUse}
              type="button"
              className={checkout.creditsUse}
            >
              <span>Use</span>
            </div>
          </div>
          <div className={checkout.NameAndPhone}>
            <div>
              <div className={checkout.inputPaymentLabel}>
                <span> Name : </span>
              </div>
              <input
                onChange={handleChange}
                name="name"
                className={checkout.inputPayment}
                type="text"
              />
            </div>
            <div>
              <div className={checkout.inputPaymentLabel}>
                <span> Contact : </span>
              </div>
              <input
                onChange={handleChange}
                name="phone"
                className={checkout.inputPayment}
                type="number"
              />
            </div>
          </div>
          <div onClick={handleCOD} type="button" className={checkout.COD}>
            <h3>Cash On Delivery</h3>
          </div>
          <div
            onClick={() => checkoutHandler(subtotal)}
            type="button"
            className={checkout.Online}
          >
            <h3>Pay via Online</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;
