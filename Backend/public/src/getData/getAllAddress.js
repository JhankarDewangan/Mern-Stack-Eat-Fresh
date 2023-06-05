async function getAllAddress(user_id) {
  // return empty array if no saved addresses else returns an array of addresses
  const response = await fetch(
    `http://localhost:3500/customer/address/getAddress/${user_id}`,
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
    if (json.message) return [];
    else return json;
  }
}

// async function check() {
//   console.log(await getAllAddress("dassouvik2021@gmail.com"));
// }

// check();
export default getAllAddress;
