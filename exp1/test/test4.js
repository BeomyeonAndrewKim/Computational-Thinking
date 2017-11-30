let arr = [1, 2, 3, 4, 5]
  //console.log(arr)

var a2 = [];
for (var i = 0; i < arr.length; i++) {
  a2.push(arr[i] * 2);
}
console.log(a2);

//old source
var a3 = arr.map(function(x) {
  return x * 2;
});

//ES6 code
let arr2 = arr.map(x => x * x);
console.log(arr2)