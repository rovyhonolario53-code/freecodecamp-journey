function permuteString(str, prefix = "", results = []) {
    if (str.length === 0) {
        if (!results.includes(prefix)) {
            results.push(prefix);
        }
        return results;
    } else {
        for (let i = 0; i < str.length; i++) {
            const remaining = str.slice(0, i) + str.slice(i + 1);
            permuteString(remaining, prefix + str[i], results)
        }
    }
    return results;
}

const form = document.querySelector("#permutation-form");
const input = document.querySelector("#input-string");
const resultsList = document.querySelector("#results-list");
const resultCount = document.querySelector("#result-count");
const statusMessage = document.querySelector("#status-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = input.value.trim();
    const permutations = permuteString(value);

    resultsList.replaceChildren();
    permutations.forEach((permutation) => {
        const result = document.createElement("li");
        result.textContent = permutation;
        resultsList.append(result);
    });

    resultCount.textContent = permutations.length;
    statusMessage.textContent = `${permutations.length} unique permutation${permutations.length === 1 ? "" : "s"} generated.`;
});