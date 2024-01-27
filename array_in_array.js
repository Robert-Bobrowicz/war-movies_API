
const arr = [
    ['valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'bomb', 'bomb'],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    ['valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'valid', 'bomb', 'bomb']
];


//sortowanie elementów w tablicy głównej i elementów w tablicach zagnieżdżonych
// console.log(arr.sort((a,b) => a-b));

// arr.forEach(el => console.log(el.sort((a, b) => a - b)));
// console.log(arr);


//znajdowanie elementu w tablicach zagnieżdżonych
arr.forEach(el => el.includes(2) ? console.log(arr.indexOf(el) + 1, el.indexOf(2) + 1, 'true') : console.log('false'));


//przypadkowe rozłożenie elementów w tablicy i tablicach zagnieżdżonych
// arr.sort(() => Math.random() - 0.5);
arr.forEach(el => el.sort(() => Math.random() - 0.5))
console.log(arr);