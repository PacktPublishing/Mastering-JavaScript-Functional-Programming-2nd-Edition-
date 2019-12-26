var second = function() {};
console.log(second.name);
// "second"

var myArray = new Array(3);
myArray[1] = function() {};
console.log(myArray[1].name);
// ""

var myCounter = (function(initialValue = 0) {
    let count = initialValue;
    return function() {
        count++;
        return count;
    };
})(77);

console.log(myCounter()); // 78
console.log(myCounter()); // 79
console.log(myCounter()); // 80

var sum3 = new Function("x", "y", "z", "var t = x+y+z; return t;");
console.log(sum3(4, 6, 7)); // 17

const f1 = (x, y, z) => x + y + z;
console.log(f1(4, 6, 7));

const f2 = (x, y, z) => {
    return x + y + z;
};
console.log(f2(4, 6, 7));

function somethingElse() {
    // get arguments and do something
}

function listArguments() {
    console.log(arguments);
    var myArray = Array.prototype.slice.call(arguments);
    console.log(myArray);
    somethingElse.apply(null, myArray);
}

listArguments(22, 9, 60);
// (3) [22, 9, 60, callee: function, Symbol(Symbol.iterator): function]
// (3) [22, 9, 60]

function listArguments2(...args) {
    console.log(args);
    somethingElse(...args);
}

listArguments2(12, 4, 56);
// (3) [12, 4, 56]

const altSum3 = x => y => z => x + y + z;
console.log(altSum3(1)(2)(3)); // 6

let fn1 = altSum3(1);
let fn2 = fn1(2);
let fn3 = fn2(3);
console.log(fn3);

function ShowItself1(identity) {
    this.identity = identity;
    setTimeout(function() {
        console.log(this.identity);
    }, 1000);
}

var x = new ShowItself1("Functional");
// after one second, undefined is displayed

function ShowItself2(identity) {
    this.identity = identity;
    let that = this;
    setTimeout(function() {
        console.log(that.identity);
    }, 1000);

    setTimeout(
        function() {
            console.log(this.identity);
        }.bind(this),
        2000
    );

    setTimeout(() => {
        console.log(this.identity);
    }, 3000);
}

var x = new ShowItself2("JavaScript");
// after one second, "JavaScript"
// after another second, the same
// after yet another second, once again
