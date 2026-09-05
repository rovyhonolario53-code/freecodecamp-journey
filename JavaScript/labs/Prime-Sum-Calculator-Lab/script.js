function sumPrimes(n) {
  if (n < 2) return 0;
  let sum = 0;
  for (let i = 2; i <= n; i++) {
    let isPrime = true;;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      sum += i
    }
  }
  return sum;
}

console.log(sumPrimes(10))

