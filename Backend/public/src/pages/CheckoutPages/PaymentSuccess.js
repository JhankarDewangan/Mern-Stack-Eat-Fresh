import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import checkout from "../../css/checkout.module.css";
import successLogo from "../../images/succesful.png";

function PaymentSuccess() {
  localStorage.removeItem("selected_days");
  localStorage.removeItem("selected_plan");
  localStorage.removeItem("allAddress");
  localStorage.removeItem("credits");
  localStorage.removeItem("selected_address");

  // console.log(localStorage.getItem("selected_days"), "l0");
  // console.log(localStorage.getItem("selected_plan"), "l0");
  // console.log(localStorage.getItem("allAddress"), "l0");
  // console.log(localStorage.getItem("credits"), "l0");
  // console.log(localStorage.getItem("selected_address"), "l0");
  return (
    <>
      <TopNavbar />
      <div className={checkout.paymentSuccessBody}>
        <img
          style={{ height: "20vh", marginBottom: "2vh" }}
          src={successLogo}
          alt="succesImage"
        />
        <p style={{ marginTop: "1vh" }}>
          Your transaction has successfully been completed.
        </p>
        <p> For more details, check your dashboard.</p>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
