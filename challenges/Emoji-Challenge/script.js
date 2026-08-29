function getEmojiPhrase(str) {
    const result = [];

    for (const char of str) {
        switch (char) {
            case "👶":
                result.push("baby");
                break;
            case "🐱":
                result.push("cat");
                break;
            case "🐕":
                result.push("dog");
                break;
            case "🐟":
                result.push("fish");
                break;
            case "🥵":
                result.push("hot");
                break;
            case "🧊":
                result.push("ice");
                break;
            case "🪨":
                result.push("rock");
                break;
            case "🦈":
                result.push("shark");
                break;
            case "🍲":
                result.push("soup");
                break;
            case "⭐":
                result.push("star");
                break;
        }
    }

    return result.join(" ");
}

console.log(getEmojiPhrase("🥵🐕"))