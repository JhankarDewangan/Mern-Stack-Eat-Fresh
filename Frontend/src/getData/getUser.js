async function getUser(username) {
  // return empty array if no plan else returns an array of plans
  const response = await fetch(`http://localhost:3500/getUsers/${username}`, {
    // credentials: 'include',
    // Origin:"http://localhost:3000/login",

    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const json = await response.json();
  if (response.status === 200) {
    if (!json[0]) return {};
    else return json[0];
  }
}

// async function check() {
//   console.log(await getUser("dassouvik2023@gmail.com"));
// }

// check();

export default getUser;
