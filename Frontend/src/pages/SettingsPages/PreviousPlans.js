import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import previous from "../../css/settings.module.css";

let array = [1, 2, 3, 4, 5, 6, 7];

let allPlans = [
  ["vegBasic", "Veg Basic"],
  ["vegPremium", "Veg Premium"],
  ["nonVegBasic", "Non Veg Basic"],
  ["nonVegPremium", "Non Veg Premium"],
];

let allSchemes = [
  ["1", "Custom 1 Day"],
  ["2", "Custom 2 Day"],
  ["3", "Custom 3 Day"],
  ["4", "Custom 4 Day"],
  ["5", "Custom 5 Day"],
  ["6", "Custom 6 Day"],
  ["7", "7 Day Plan"],
  ["14", "14 Day Plan"],
  ["28", "28 Day Plan"],
];

function assignSelectedPlan(plan) {
  let selectedPlan;

  for (let i = 0; i < allPlans.length; i++) {
    if (plan !== allPlans[i][0]) {
      continue;
    }
    selectedPlan = allPlans[i][1];
    break;
  }
  return selectedPlan;
}

function assignSelectedDays(days) {
  let selectedDays;
  for (let i = 0; i < allSchemes.length; i++) {
    if (days !== allSchemes[i][0]) {
      continue;
    }
    selectedDays = allSchemes[i][1];
    break;
  }
  return selectedDays;
}

function PrevoiusPlans() {
  let allPlans = JSON.parse(localStorage.getItem("allPlans"));
  console.log("allPlans in prev Plans", allPlans);
  return (
    <>
      <TopNavbar />
      <div className={previous.prevbody}>
        <div className={previous.previousPlanLabel}>
          <p>Previous Plans</p>
        </div>
        <div className={previous.previousPlansCard}>
          {allPlans[0] ? (
            allPlans.map((plan, index) => {
              let selectedPlan = assignSelectedPlan(plan.selectedPlan);
              let selectedDays = assignSelectedDays(plan.selectedDays);

              return (
                <div className={previous.prevPlan}>
                  <span style={{ fontSize: "2vh" }}>
                    Selected Plan : {selectedPlan} <br /> Selected Days :{" "}
                    {selectedDays} , Start Date : {plan.start} , End Date :{" "}
                    {plan.end}, Plan Total : {plan.additional + plan.total}{" "}
                    <br />
                    Credits Used : {plan.creditsUsed} , Amount Paid :{" "}
                    {plan.subtotal}
                    {plan.planChangeFrom ? (
                      <span>
                        {" "}
                        <br />
                        {/* Plan Change Details : <br /> */}
                        Plan Changed From :{" "}
                        {assignSelectedPlan(plan.planChangeFrom)} , Credits
                        Recieved : {plan.planChangeCredits} , Amount Paid :{" "}
                        {plan.planChangePay}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <div>
              <span>No Previous Plans</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrevoiusPlans;
