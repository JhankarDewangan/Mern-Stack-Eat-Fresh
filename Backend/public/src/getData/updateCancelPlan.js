async function updateCancelPlan(id, day, meal) {
  // meal - (Lunch/Breakfast/Dinner) & day - 0  || meal - 0(no meal change) & day - 1
  const response = await fetch(
    "http://localhost:3500/customer/myPlan/updateCancelPlan",
    {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id: id,
        day: day,
        meal: meal,
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

// let plan = {
//   _id: " 64799e8377798f26e941644d",
//   username: "dassouvik2023@gmail.com",
//   name: "Souvik Das",
//   phone: "7797840865",
//   selectedPlan: "vegPremium",
//   selectedDays: "7",
//   address: "Old Home , 2, Esha Apartment , City Mall, Pune - 734001",
//   start: "3-6-2023",
//   end: "9-6-2023",
//   total: 1131,
//   additional: 57,
//   subtotal: 1188,
//   creditsUsed: 0,
//   __v: 0,
//   cancelDay: "2-6-2023",
//   cancelMeal: "3-6-2023/Breakfast",
// };

// async function check() {
//   //   console.log(await updateCancelPlan("64799e8377798f26e941644d", 1, 0));
//   console.log(canCancel(plan));
// }

// check();

function canCancel(plan) {
  console.log("hello");
  if (!plan.cancelMeal && !plan.cancelDay) {
    return true;
  }
  let date = new Date();
  date.setDate(date.getDate() + 1);
  let nextDay =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  if (plan.cancelDay) {
    if (nextDay === plan.cancelDay) {
      return false;
    } else {
      return true;
    }
  }
  if (plan.cancelMeal) {
    console.log("oo");
    let cancelDayDate = "";
    for (let i = 0; i < plan.cancelMeal.length; i++) {
      if (plan.cancelMeal[i] === "/") break;
      cancelDayDate += plan.cancelMeal[i];
    }

    if (nextDay === cancelDayDate) {
      return false;
    } else {
      return true;
    }
  }
}

export { updateCancelPlan, canCancel };
