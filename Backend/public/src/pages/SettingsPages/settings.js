import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import settings from "../../css/settings.module.css";
import { useNavigate } from "react-router-dom";
import getAllPlans from "../../getData/getAllPlans";
import getTransactions from "../../getData/getTransactions";
import getCredits from "../../getData/getCredits";
import planValidator from "../../daysPlan/planValidator";
import { canCancel } from "../../getData/updateCancelPlan";
import getUser from "../../getData/getUser";
import { notify } from "../../alerts/toastify";

let getPrevPlans = getAllPlans.getAllPlans;
let getLastPlan = getAllPlans.getLastPlan;

function Settings() {
  localStorage.removeItem("allPlans");
  // removing allPlans when user comes back to settings page from previous plans page
  localStorage.removeItem("allTransactions");
  // removing allPlans when user comes back to settings page from previous plans page
  let navigate = useNavigate();
  async function handlePlansClick() {
    if (localStorage.getItem("token")) {
      let user = await getUser(localStorage.getItem("username"));
      let allPlans = await getPrevPlans(user._id);
      localStorage.setItem("allPlans", JSON.stringify(allPlans));
      console.log(JSON.parse(localStorage.getItem("allPlans")), " all Plans");
      navigate("/settings/prevplans");
    } else {
      notify("You need to login");
    }
  }
  async function handleCancellation() {
    if (localStorage.getItem("token")) {
      let user = await getUser(localStorage.getItem("username"));
      let credits = await getCredits(user._id);
      localStorage.setItem("credits", credits);
      let plan = await getLastPlan(user._id); //last plan
      console.log(plan.end, "plan-end");
      localStorage.setItem("lastPlan", JSON.stringify(plan));
      console.log(planValidator(plan.end));
      if (planValidator(plan.end)) {
        if (canCancel(plan)) {
          navigate("/settings/cancellation");
        } else {
          notify("Only one cancellation available in a single day");
        }
      } else {
        notify("No valid plan to make cancellations");
      }
    } else {
      notify("You need to login first");
    }
  }
  async function handleTransactionsClick() {
    if (localStorage.getItem("token")) {
      let user = await getUser(localStorage.getItem("username"));
      let allTransactions = await getTransactions(user._id);
      localStorage.setItem("allTransactions", JSON.stringify(allTransactions));
      // console.log(
      //   JSON.parse(localStorage.getItem("allTransactions")),
      //   " all Transactions"
      // );
      navigate("/settings/prevtransactions");
    } else {
      notify("You need to login !");
    }
  }
  return (
    <>
      <TopNavbar />
      <div className={settings.body}>
        <div className={settings.settingCard}>
          <div className={settings.outerCardBody}>
            <div className={settings.settingsLabel}>
              <p>
                <i class="fa-solid fa-gear"></i> Settings
              </p>
            </div>
            <div
              onClick={() => {
                navigate("/settings/aboutus");
              }}
              className={settings.settingsAboutUs}
            >
              <p>About Us</p>
            </div>
          </div>
          <div className={settings.settingCardBody}>
            <div onClick={handlePlansClick}>
              <p>Previous Plans</p>
            </div>
            <div onClick={handleTransactionsClick}>
              <p>Previous Transactions</p>
            </div>
            <div onClick={handleCancellation}>
              <p>Cancellations</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Settings;
