import TopNavbar from "../../components/TopNavbar";
import Footer from "../../components/Footer";
import previous from "../../css/settings.module.css";

function PrevoiusTransactions() {
  let allTransactions = JSON.parse(localStorage.getItem("allTransactions"));
  console.log("allTransactions in prev Transactions", allTransactions);
  return (
    <>
      <TopNavbar />
      <div className={previous.prevbody}>
        <div className={previous.previousPlanLabel}>
          <p>Previous Transactions</p>
        </div>
        <div className={previous.previousPlansCard}>
          {allTransactions[0] ? (
            allTransactions.map((transaction, index) => {
              return (
                <div>
                  <span style={{ fontSize: "2vh" }}>
                    Razorpay Order Id : {transaction.razorpay_order_id}
                    <br />
                    Razorpay payment Id : {transaction.razorpay_payment_id}
                  </span>
                </div>
              );
            })
          ) : (
            <div>
              <span>No Previous Transactions</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrevoiusTransactions;
