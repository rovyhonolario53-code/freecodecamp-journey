function areAnagrams(str1, str2) {

    const string1 = str1.toLowerCase().replace(/\s/g, "").split("")
    const string2 = str2.toLowerCase().replace(/\s/g, "").split("")
    console.log(string1)
    console.log(string2)

    const hasLetter = string2.every((letter) => string1.includes(letter));


    return hasLetter;
}
console.log(areAnagrams("School master", "The classroom"))