function jbelmu(text) {

    const string = text.split(" ")
    const mappedString = string.map((word) => {

        if (word.length === 1) return word;

        const first = word[0];
        const last = word[word.length - 1]
        const middle = word.slice(1, -1);

        const sorted = middle.split("").sort((a, b) => a.localeCompare(b)).join("");
        return first + sorted + last;
    })

    return mappedString.join(" ");
}

console.log(jbelmu("hello world"))