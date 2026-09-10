function sumOfSquares(n) {
    if (n === 1) return 1;

    return n ** 2 + sumOfSquares(n - 1);
}