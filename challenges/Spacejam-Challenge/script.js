function spaceJam(s) {
    const string = s.replace(/\s/g, "");
    const regex = /[a-z]/i;
    const finalString = [];

    for (let i = 0; i < string.length; i++) {
        let tempString = string[i]
        if (regex.test(tempString)) tempString = tempString.toUpperCase();

        finalString.push(tempString)
    }

    return finalString.join("  ");
}

console.log(spaceJam("freeCodeCamp"))