const array = [
    { id: 1, universe: "marvel", name: "Spider Man" },
    { id: 2, universe: "marvel", name: "Iron Man" },
    { id: 3, universe: "dc", name: "Aqua Man" },
    { id: 4, universe: "dc", name: "Bat Man" },
    { id: 5, universe: "marvel", name: "Hulk" }
];

let groupBy = (arr, key) => {
    if (!key) {
        alert('Error! Enter key');
        return new Error('Error! Enter key');
    } 
    if (!arr) {
        alert('Error! Enter array!');
        return new Error('Error! Enter array!');
    }
    let result = arr.reduce((currentValue, accumulator) => {
        if (!accumulator[key]) {
            return Object.create({});
            }
            currentValue[accumulator[key]] = currentValue[accumulator[key]] || [];
            currentValue[accumulator[key]].push(accumulator);
            return currentValue
        }, Object.create(null));
    console.log(result);
        
}

groupBy(array, "universe");