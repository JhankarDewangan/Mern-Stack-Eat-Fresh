let pricing = {
  // 1 day price
  vegBasic: 130,
  vegPremium: 170,
  nonVegBasic: 150,
  nonVegPremium: 200,
  customize: 215, // 1 day price
};

function calculateChange(current, change, end) {
  let pay;
  let addToCredits;
  let date = new Date();
  let remain = 0;
  while (true) {
    remain++;
    date.setDate(date.getDate() + 1);
    let curr =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    if (curr === end) {
      break;
    }
  }
  let amt = pricing[current] * remain - pricing[change] * remain;
  if (amt < 0) {
    pay = Math.abs(amt);
    addToCredits = 0;
    amt = Math.abs(amt);
  } else {
    pay = 0;
    addToCredits = amt;
  }
  return { pay: pay, addToCredits: addToCredits, amt: amt };
}

// console.log(calculateChange("vegPremium", "nonVegPremium", "7-6-2023"));

export default calculateChange;
