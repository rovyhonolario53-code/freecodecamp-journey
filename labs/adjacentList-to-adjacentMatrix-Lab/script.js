function adjacencyListToMatrix(obj) {
  let nodes = 0;
  for (const keys in obj) {
    if (keys) {
      nodes++
    }
  }
  let finalNode = [];

  for (const key in obj) {
      const startArray = new Array(nodes).fill(0);
      for (const num of obj[key]) {
        startArray[num] = 1
      }
    console.log(startArray);
    finalNode.push(startArray);
  }
  return finalNode;
};

