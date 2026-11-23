function count(str) {

const regexVowel = /[aeiou]/i;
const regexCon = /[qwrtypsdfghjklzxcvbnm]/i
let conCount = 0;
let vowelCount = 0; 

for (let i = 0; i < str.length; i++) {
  if (regexVowel.test(str[i])) vowelCount++
  if (regexCon.test(str[i])) conCount++
}


  return [vowelCount ,conCount];
}

console.log(count("hello world"))