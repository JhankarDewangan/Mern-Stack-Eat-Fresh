var date = new Date();
var end = "15-6-2023";

function planValidator(end) {
  let date = new Date();
  let c = 0;
  let s = "";
  let endDate;
  let endMonth;
  let endYear;
  for (let i = 0; i < end.length; i++) {
    if (end[i] !== "-") {
      s = s + end[i];
    } else {
      if (c === 0) {
        endDate = s;
        s = "";
        c++;
      } else if (c === 1) {
        endMonth = s;
        s = "";
        c++;
      }
    }
  }
  endYear = s;
  console.log(endDate, endDate, endYear);
  if (date.getFullYear() > endYear) {
    // checking if endYear less than present year
    return false;
  } else if (date.getFullYear() < endYear) {
    // checking if endYear greater than present year
    return true;
  }
  if (date.getMonth() + 1 > endMonth) {
    // checking if endMonth less than present month
    return false;
  } else if (date.getMonth() + 1 < endMonth) {
    // checking if endMonth more than preseent month
    return true;
  }
  if (date.getDate() > endDate) {
    // checking if endDate less than present date
    return false;
  } else {
    //if endDate equals or more than present Date
    return true;
  }
}

console.log(planValidator(end));
