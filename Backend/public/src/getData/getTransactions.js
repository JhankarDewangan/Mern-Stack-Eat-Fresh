async function getTransactions(user_id) {
  // return empty array if no plan else returns an array of plans
  const response = await fetch(
    `http://localhost:3500/api/getTransactions/${user_id}`,
    {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",

      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: new URLSearchParams({
      //   username: username,
      // }),
    }
  );
  const json = await response.json();
  if (response.status === 200) {
    if (json.plans == 0) return [];
    else return json;
  }
}
// async function check() {
//   console.log(await getTransactions("dassouvik2023@gmail.com"));
// }

// check();

export default getTransactions;
