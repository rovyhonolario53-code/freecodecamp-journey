function getLaptopCost(laptops, budget) {

    const laptopsSort = laptops.sort((a, b) => b - a).filter((item, index) => laptops.indexOf(item) === index)

    if (budget >= laptopsSort[0]) {
        return laptopsSort[1];
    } else {
        for (let j = 0; j < laptopsSort.length; j++) {
            if (budget >= laptopsSort[j]) {
                return laptopsSort[j]
            }
        }
    }
    return 0;
}
console.log(getLaptopCost([1500, 2000, 1800, 1400], 1900))