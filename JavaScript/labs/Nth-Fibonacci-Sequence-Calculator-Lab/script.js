function fibonacci(n) {
  const sequence = [0, 1];
  if (n < 2) return sequence[n];

  for (let i = 2; i <= n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }

  return sequence[n];
}

const result = document.getElementById("result");
const input = document.getElementById("input");
const btn = document.getElementById("generate");

btn.addEventListener("click", () => {
  const value = parseInt(input.value, 10);

  if (isNaN(value) || value <= 0) {
    result.textContent = "Please enter a valid number greater than 0.";
    result.style.display = "flex"
    result.style.color = "red";
    return;
  }

  const textResult = fibonacci(value);

  result.textContent = textResult;
  result.style.display = "flex"
  result.classList.add("animate-show")
  input.value = ""
});