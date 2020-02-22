const xo=[5,6]
const original = [1,2,xo]

const copy =[1,2, ...xo, ...xo, xo, ...xo]

console.log(original ); // false
console.log(copy); // false
