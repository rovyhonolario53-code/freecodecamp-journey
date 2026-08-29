function solveMagicSquare(grid) {
    let magicSum = 0;
    let zeroCol = -1;
    let zeroRow = -1;

    for (let i = 0; i < 3; i++) {
        let rowTotal = 0;
        let hasZero = false
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === 0) {
                hasZero = true
                zeroRow = i
                zeroCol = j
            }
            rowTotal += grid[i][j]
        }
        if (!hasZero) {
            magicSum = rowTotal;
        }
    }
    let missingValue = magicSum - (grid[zeroRow][0] + grid[zeroRow][1] + grid[zeroRow][2]);
    grid[zeroRow][zeroCol] = missingValue;

    let isValid = true;

    for (let i = 0; i < 3; i++) {
        let rowTotal = 0;
        let colTotal = 0;
        for (let j = 0; j < 3; j++) {
            rowTotal += grid[i][j];
            colTotal += grid[j][i];
        }
        if (rowTotal !== magicSum || colTotal !== magicSum) {
            isValid = false;
        }
    }

    let diag1 = grid[0][0] + grid[1][1] + grid[2][2];
    let diag2 = grid[0][2] + grid[1][1] + grid[2][0];
    if (diag1 !== magicSum || diag2 !== magicSum) {
        isValid = false;
    }

    return isValid ? missingValue : "impossible"
}


console.log(solveMagicSquare([[2, 7, 6], [9, 0, 1], [4, 3, 8]]));