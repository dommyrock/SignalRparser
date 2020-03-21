//Bitwise operators @https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
//generate random GUID/UUID
// -info @https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line no-mixed-operators
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  );
}

//filter large dataset with  loop(faster than .filter())
//@https://stackoverflow.com/questions/13565751/what-is-the-highest-performance-way-to-filter-a-list-of-json-objects-in-javascri
export function filterData(dattaArr) {
  var match = [];

  for (var i = 0; i < dattaArr.length; i++) {
    if (dattaArr[i] > 3) match.push(dattaArr[i]);
  }

  return match;
}
// output -->var result = filter(dataToFilter);
