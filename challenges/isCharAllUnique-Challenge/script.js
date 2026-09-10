function allUnique(str) {
    const unique = [];

    for (let i = 0; i < str.length; i++) {
        if (unique.includes(str[i])) return false;
        unique.push(str[i]);
    }

    return true;
}