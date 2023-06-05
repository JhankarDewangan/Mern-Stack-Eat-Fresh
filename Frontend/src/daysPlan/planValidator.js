function planValidator(end) {
  if (end === undefined) return false;
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
    return false;
  } else if (date.getFullYear() < endYear) {
    return true;
  }
  if (date.getMonth() + 1 > endMonth) {
    return false;
  } else if (date.getMonth() + 1 < endMonth) {
    return true;
  }
  if (date.getDate() > endDate) {
    return false;
  } else {
    return true;
  }
}

// let abc = {};
// console.log(planValidator(abc.end));
export default planValidator;
