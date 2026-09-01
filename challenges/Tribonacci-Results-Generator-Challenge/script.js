function tribonacci(startSequence, length) {
  const results = [...startSequence];
  if (length === 0) return [];

  for (let i = 3; i <= length; i++) {
    results.push(results[i - 1] + results[i - 2] + results[i - 3]);
  }

  return results.slice(0, length);
}

const result = document.getElementById("result");
const input = document.getElementById("input");
const btn = document.getElementById("generate");

btn.addEventListener("click",() => {
  const value = parseInt(input.value, 10);

  if (isNaN(value) || value <= 0) {
    result.textContent = "Please enter a valid number greater than 0.";
    result.classList.remove("hidden");
    return;
  }

  const textResult = tribonacci([0, 0, 1], value);


  result.textContent = textResult.join(", ");
  result.style.display = "flex" 
  result.classList.add("animate-show")
  input.value = ""
});