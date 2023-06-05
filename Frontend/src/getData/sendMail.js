async function sendMail(email, html, subject) {
  // meal - (Lunch/Breakfast/Dinner) & day - 0  || meal - 0(no meal change) & day - 1
  const response = await fetch("http://localhost:3500/email/", {
    // credentials: 'include',
    // Origin:"http://localhost:3000/login",

    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: email,
      html: html,
      subject: subject,
    }),
  });
  const json = await response.json();
  //   console.log(json);
  if (response.status === 200) {
    if (json.message) return {};
    else return json;
  }
}

// async function check() {
//   console.log(
//     await sendMail(
//       "tinapallab@gmail.com",
//       "<h1>Hello Pallab</h1></br> <h1>Greetings from Eat Fresh</h1>",
//       "Greetings"
//     )
//   );
// }
// check();

export default sendMail;
