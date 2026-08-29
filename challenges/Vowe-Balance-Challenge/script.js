function isBalanced(s) {
const mid = Math.floor(s.length / 2);
const rightStr = s.slice(s.length % 2 === 0 ? mid : mid + 1)
const leftStr = s.slice(0, mid);
const regex = /[aeiou]/i
let leftCt = 0;
let rightCt = 0;

for (let i = 0; i < rightStr.length; i++) {
  if (regex.test(rightStr[i])) {
    rightCt++;
  }
}

for (let j = 0; j < leftStr.length; j++) {
  if (regex.test(leftStr[j])) {
    leftCt++;
  }
}

return rightCt === leftCt;
}

console.log(isBalanced("racecar"))