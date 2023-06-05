async function updateMyPlan(id, oldPlan, changePlan, pay, addToCredits) {
  // returns {} if no plans  else returns an object of update plan
  const response = await fetch(
    "http://localhost:3500/customer/myPlan/updatePlan",
    {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: id,
        oldPlan: oldPlan,
        changePlan: changePlan,
        pay: pay,
        addToCredits: addToCredits,
      }),
    }
  );
  const json = await response.json();
  //   console.log(json);
  if (response.status === 200) {
    if (json.message) return {};
    else return json[0];
  }
}
// let id = "6476f8b25a50e5380589658c";
// let oldPlan = "nonVegPremium";
// let changePlan = "vegBasic";
// let pay = 0;
// let addToCredits = 400;

// async function check() {
//   console.log(await updateMyPlan(id, oldPlan, changePlan, pay, addToCredits));
// }

// check();

export default updateMyPlan;
