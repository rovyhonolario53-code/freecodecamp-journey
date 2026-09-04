function isPangram(sentence, letters) {
    const string = sentence.toLowerCase().replace(/[^a-zA-Z]/g, "");
    const letter = letters.toLowerCase();

    for (let i = 0; i < letter.length; i++) {
        if (!string.includes(letter[i])) return false;
    }

    for (let j = 0; j < string.length; j++) {
        if (!letter.includes(string[j])) return false;
    }

    return true;
}