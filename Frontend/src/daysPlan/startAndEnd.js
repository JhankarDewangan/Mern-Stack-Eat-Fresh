function getStartAndEnd(daysPlan) {
  let arr = [];
  let date = new Date();
  // let month = date.getMonth() + 1;
  // let pDay = date.getDate() + "/" + month + "/" + date.getFullYear();
  let curr;
  let i = 0;
  while (i < daysPlan) {
    date.setDate(date.getDate() + 1);

    curr =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    // console.log(curr);
    arr.push(curr);
    i++;
  }
  return [arr[0], arr[arr.length - 1]];
}

console.log(getStartAndEnd(7));
export default getStartAndEnd;
