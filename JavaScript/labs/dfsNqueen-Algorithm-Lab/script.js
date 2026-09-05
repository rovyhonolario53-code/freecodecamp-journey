function dfsNQueens(n) {
    if (n < 1) return [];

    const solutions = [];

    function isSafe(positions, row, col) {
        for (let r = 0; r < row; r++) {
            const c = positions[r];
            if (col === c) {
                return false;
            }
            if (Math.abs(row - r) === Math.abs(col - c)) {
                return false;
            }
        }
        return true;
    }
    function backtrack(positions, row) {
        if (row === n) {
            solutions.push([...positions])
        }

        for (let col = 0; col < n; col++) {
            if (isSafe(positions, row, col)) {
                positions.push(col);
                backtrack(positions, row + 1);
                positions.pop();
            }
        }
    }

    backtrack([], 0)
    return solutions;

}


