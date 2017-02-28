require('./css/main.less')
const webpack = require('./index2.js');



// test generate
function* idMaker() {
    var index = 0;
    while (index < 3) {
        yield index++;
    }
}

var gen = idMaker();


console.log(333)


// // test async
function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}
async function add1(x) {
    var a = resolveAfter2Seconds(20);
    var b = resolveAfter2Seconds(30);
    return x + await a + await b;
}

add1(10).then(v => {
    console.log(v); // prints 60 after 2 seconds.
});


// test class
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
var p = new Polygon();


console.log(222, typeof Polygon)
