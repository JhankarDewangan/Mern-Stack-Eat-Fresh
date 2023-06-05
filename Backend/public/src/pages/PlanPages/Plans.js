import Footer from "../../components/Footer";
import TopNavbar from "../../components/TopNavbar";
import styles from "../../css/plans.module.css";
import logoTagline from "../../images/LOGO_Tagline.png";
import { Link, useNavigate } from "react-router-dom";

function Plans() {
  console.log(localStorage.getItem("token"), "token");
  console.log(localStorage.getItem("username"), "token");
  const navigate = useNavigate();
  return (
    <>
      <TopNavbar className="bg-sky-700 text-lg" />
      <div className={styles.plansBody}>
        <div className={styles.dashLeft}>
          <img style={{ height: "30vh" }} src={logoTagline} />
          <div className={styles.dashText}>
            <h2 style={{ fontWeight: "bolder" }}> Solving </h2>
            <h2 style={{ fontWeight: "bolder" }}>Your Day to Day </h2>
            <h2 style={{ fontWeight: "bolder" }}>
              {" "}
              <span style={{ color: "#519938" }}>Health</span>
              <span style={{ color: "orange" }}> Needs</span>{" "}
            </h2>
          </div>
        </div>
        <div className={styles.dashRight}>
          <div className={styles.mealPlans}>
            <div
              onClick={() => {
                navigate("/plans/nonVegBasic");
              }}
              type="button"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
              className={styles.planType}
            >
              <h3>NON-VEG BASIC</h3>
            </div>

            <div
              onClick={() => {
                navigate("/plans/vegBasic");
              }}
              type="button"
              style={{ backgroundColor: "rgba(81, 153, 56, 0.8)" }}
              className={styles.planType}
            >
              <h3>VEG BASIC</h3>
            </div>
            <div
              onClick={() => {
                navigate("/plans/nonVegPremium");
              }}
              type="button"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
              className={styles.planType}
            >
              <h3>NON-VEG PREMIUM</h3>
            </div>
            <div
              onClick={() => {
                navigate("/plans/vegPremium");
              }}
              type="button"
              style={{
                backgroundColor: "rgba(81, 153, 56, 0.8)",
              }}
              className={styles.planType}
            >
              <h3>VEG PREMIUM</h3>
            </div>
          </div>
          <div
            onClick={() => {
              navigate("/plans/customize");
            }}
            type="button"
            className={styles.customPlan}
          >
            <h3> CUSTOMIZE </h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Plans;
