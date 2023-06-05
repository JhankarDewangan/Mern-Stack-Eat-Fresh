import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import TopNavbar from "../../components/TopNavbar";
import styles from "../../css/plans.module.css";
import logoTagline from "../../images/LOGO_Tagline.png";
import infoStyles from "../../css/planinfo.module.css";
import pricing from "../../mealsData/pricing";
import getAllPlans from "../../getData/getAllPlans";
import planValidator from "../../daysPlan/planValidator";
import getUser from "../../getData/getUser";
import { notify } from "../../alerts/toastify";

let getLastPlan = getAllPlans.getLastPlan;

function PlanDetail() {
  let { planType } = useParams();
  let daywisePricing = pricing[planType];
  let navigate = useNavigate();

  return (
    <>
      <TopNavbar className="bg-sky-700 text-lg" />
      <div className={infoStyles.body}>
        <div className={infoStyles.card}>
          <div className={infoStyles.innerCard1}>
            <div
              onClick={() => navigate(`/plans/${planType}/monday`)}
              type="button"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
            >
              <h3> MON</h3>
            </div>
            <div
              onClick={() => navigate(`/plans/${planType}/tuesday`)}
              type="button"
              style={{ backgroundColor: "rgba(81, 153, 56, 0.8)" }}
            >
              <h3>TUES</h3>
            </div>
            <div
              onClick={() => navigate(`/plans/${planType}/wednesday`)}
              type="button"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
            >
              <h3>WED</h3>
            </div>
            <div
              onClick={() => navigate(`/plans/${planType}/thursday`)}
              type="button"
              style={{ backgroundColor: "rgba(81, 153, 56, 0.8)" }}
            >
              <h3>THURS</h3>
            </div>
            <div
              onClick={() => navigate(`/plans/${planType}/friday`)}
              type="button"
              style={{ backgroundColor: "rgba(255, 165, 0, 0.9)" }}
            >
              <h3>FRI</h3>
            </div>
            <div
              onClick={() => navigate(`/plans/${planType}/saturday`)}
              type="button"
              style={{ backgroundColor: "rgba(81, 153, 56, 0.8)" }}
            >
              <h3> SAT </h3>
            </div>
          </div>
          <div
            onClick={() => navigate(`/plans/${planType}/sunday`)}
            type="button"
            className={infoStyles.innerCard2}
          >
            <h3> SUNDAY </h3>
          </div>
        </div>
        <div className={infoStyles.details}>
          <div className={infoStyles.pricing}>
            <div>
              <p>7 day Plan:</p>
              <p>{daywisePricing[7]}</p>
            </div>
            <div>
              <p>14 day Plan:</p>
              <p>{daywisePricing[14]}</p>
            </div>
            <div>
              <p>28 day Plan:</p>
              <p>{daywisePricing[28]}</p>
            </div>
            <div>
              <p>custom:</p>
              <p>{daywisePricing.custom}</p>
            </div>
          </div>
          {/* <div type="button" className={infoStyles.addAddr}>
            <h3>Add Address</h3>
          </div> */}
          <div
            type="button"
            onClick={async () => {
              if (!localStorage.getItem("token"))
                navigate(`/plans/${planType}/checkout`);
              else {
                let user = await getUser(localStorage.getItem("username"));
                let plan = await getLastPlan(user._id);
                if (!planValidator(plan.end)) {
                  navigate(`/plans/${planType}/checkout`);
                } else {
                  notify(
                    "You already have a valid plan, You can change your plan instead"
                  );
                  setTimeout(() => {
                    navigate(`/dashboard`);
                  }, 2000);
                }
              }
            }}
            className={infoStyles.checkout}
          >
            <h3>Proceed to Checkout</h3>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default PlanDetail;
