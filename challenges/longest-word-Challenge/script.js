function longestWord(sentence) {

  let longest = "";
  const regex = /[^a-zA-Z]+/g
  const words = sentence.trim().split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const cleaned = words[i].replace(regex, "")
    if (cleaned.length > longest.length) {
      longest = cleaned;
    }
  }

  return longest;
}

console.log(longestWord("Hello coding challenge."))