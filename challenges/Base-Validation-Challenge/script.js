function isValidNumber(n, base) {
    const all = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    n = n.toUpperCase();

    for (let i = 0; i < n.length; i++) {
        if (all.indexOf(n[i]) === -1 || all.indexOf(n[i]) >= base) return false
    }

    return true;
}

console.log(isValidNumber("abc", 10))