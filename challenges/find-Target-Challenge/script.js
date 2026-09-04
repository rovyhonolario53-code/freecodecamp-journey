function findTarget(arr, target) {
    const indexes = [];
    let isFound = false;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arguments.length; j++) {
            if (arr[i] + arr[j] === target) {
                indexes.push(i,j);
                isFound = true;
                break;
            }
        }
    }
    return isFound ? indexes : "Target not found";
}