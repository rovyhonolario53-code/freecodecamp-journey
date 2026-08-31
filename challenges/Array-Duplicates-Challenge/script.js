function findDuplicates(arr) {
  const newArr = arr.filter((item, index) => arr.indexOf(item) !== index).sort((a, b) => a - b);


  return [...new Set(newArr)];
}