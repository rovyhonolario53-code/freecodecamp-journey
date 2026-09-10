function buildAcronym(str) {
    const words = str.split(" ");
    const result = [];
    const ignore = ["a", "for", "and", "an", "of", "by", "the"];

    for (let i = 0; i < words.length; i++) {
        const word = words[i].toLowerCase();

        if (ignore.includes(word) && i !== 0) {
            continue;
        }

        result.push(words[i][0].toUpperCase());
    }

    return result.join("");
}

console.log(buildAcronym("By the way"));