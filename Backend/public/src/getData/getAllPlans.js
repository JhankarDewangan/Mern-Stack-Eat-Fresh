async function getAllPlans(user_id) {
  // return empty array if no plan else returns an array of plans
  const response = await fetch(
    `http://localhost:3500/customer/myPlan/getmyPlan/${user_id}`,
    {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: new URLSearchParams({
      //   user_id: user_id,
      // }),
    }
  );
  const json = await response.json();
  if (response.status === 200) {
    if (json.plans == 0) return [];
    else return json;
  }
}

async function getLastPlan(user_id) {
  // return empty object if no plans else returns last plan in object
  const response = await fetch(
    `http://localhost:3500/customer/myPlan/getMyPlan/${user_id}`,
    {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: new URLSearchParams({
      //   user_id: user_id,
      // }),
    }
  );
  const json = await response.json();
  console.log(json);
  if (response.status === 200) {
    if (json.plans == 0) return {};
    else return json[json.length - 1];
  }
}
// async function check() {
//   console.log(await getLastPlan("dassouvik2020@gmail.com"));
// }

// check();

export default {
  getAllPlans,
  getLastPlan,
};
