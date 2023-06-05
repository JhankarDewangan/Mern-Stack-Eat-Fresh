async function getCredits(user_id) {
  // returns -1 if no credits created else returns an integer value of credit
  const response = await fetch(
    `http://localhost:3500/customer/credits/getCredits/${user_id}`,
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
  //   console.log(json);
  if (response.status === 200) {
    if (json.message) return -1;
    else return json[0].credits;
  }
}

// async function check() {
//   console.log(await getCredits("dassouvik2023@gmail.com"));
// }

// check();

export default getCredits;
