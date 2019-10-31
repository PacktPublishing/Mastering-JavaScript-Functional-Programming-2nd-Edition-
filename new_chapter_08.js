const markers = [
  {name: "AR", lat: -34.6, lon: -58.4},
  {name: "BO", lat: -16.5, lon: -68.1},
  {name: "BR", lat: -15.8, lon: -47.9},
  {name: "CL", lat: -33.4, lon: -70.7},
  {name: "CO", lat: 4.6, lon: -74.0},
  {name: "EC", lat: -0.3, lon: -78.6},
  {name: "PE", lat: -12.0, lon: -77.0},
  {name: "PY", lat: -25.2, lon: -57.5},
  {name: "UY", lat: -34.9, lon: -56.2},
  {name: "VE", lat: 10.5, lon: -66.9},
];
const binary = fn => (x, y) => fn(x, y);

const curry = fn =>
  fn.length === 0 ? fn() : p => curry(fn.bind(null, p));

const flipTwo = fn => (arg1, arg2) => fn(arg2, arg1);
const demethodize = fn => (arg0, ...args) => fn.apply(arg0, args);
const map = demethodize(Array.prototype.map);

const pipeTwo = (f, g) => (...args) => g(f(...args));
const pipeline = (...fns) => (...args) => {
  let result = fns[0](...args);
  for (let i = 1; i < fns.length; i++) {
    result = fns[i](result);
  }
  return result;
};
const pipeline2 = (...fns) =>
  fns.reduce((result, f) => (...args) => f(result(...args)));
const pipeline3 = (...fns) => fns.reduce(pipeTwo);

const sum = (x, y) => x + y;
const average = arr => arr.reduce(sum, 0) / arr.length;
const getField = attr => obj => obj[attr];
const myMap = curry(flipTwo(binary(map)));

const getLat = curry(getField)("lat");
console.log(myMap(getLat)(markers));
console.log(map(markers, getLat));
const getAllLats = curry(myMap)(getLat);

let averageLat = pipeline(getAllLats, average);
console.log(map(markers, getLat));
console.log(myMap(getLat)(markers));
// and similar code to average longitudes
console.log(averageLat(markers));

let averageLat2 = pipeline(curry(myMap)(curry(getField)("lat")), average);
let averageLon2 = pipeline(curry(myMap)(curry(getField)("lon")), average);
console.log(averageLat2(markers));

/* Node-only code starts */

function getDir(path) {
  const fs = require("fs");
  const files = fs.readdirSync(path);
  return files;
}
const filterByText = (text, arr) => arr.filter(v => v.endsWith(text));
const filterOdt = arr => filterByText(".odt", arr);
const filterOdt2 = curry(filterByText)(".odt");
const count = arr => arr.length;
const countOdtFiles = path => {
  const files = getDir(path);
  const filteredFiles = filterOdt(files);
  const countOfFiles = count(filteredFiles);
  return countOfFiles;
};
countOdtFiles("/home/fkereki/Documents"); // 4, as with the command line solution
const countOdtFiles2 = path => count(filterOdt(getDir(path)));
countOdtFiles2("/home/fkereki/Documents"); // 4, as before
const countOdtFiles3 = path =>
  pipeTwo(pipeTwo(getDir, filterOdt), count)(path);
const countOdtFiles4 = path =>
  pipeTwo(getDir, pipeTwo(filterOdt, count))(path);

((countOdtFiles3("/home/fkereki/Documents") ===
  pipeTwo(pipeTwo(getDir, filterOdt), count)(
    "/home/fkereki/Documents"
  )) ===
  count(pipeTwo(getDir, filterOdt)("/home/fkereki/Documents"))) ===
  count(filterOdt(getDir("/home/fkereki/Documents"))); // 4
((countOdtFiles4("/home/fkereki/Documents") ===
  pipeTwo(getDir, pipeTwo(filterOdt, count))(
    "/home/fkereki/Documents"
  )) ===
  pipeTwo(filterOdt, count)(getDir("/home/fkereki/Documents"))) ===
  count(filterOdt(getDir("/home/fkereki/Documents"))); // 4
pipeline(getDir, filterOdt, count)("/home/fkereki/Documents"); // still 4
pipeline2(getDir, filterOdt, count)("/home/fkereki/Documents"); // 4
pipeline3(getDir, filterOdt, count)("/home/fkereki/Documents"); // again 4

const countOdtFiles3b = pipeTwo(pipeTwo(getDir, filterOdt), count);
const countOdtFiles4b = pipeTwo(getDir, pipeTwo(filterOdt, count));

/* Node-only code ends */

const tap = curry((fn, x) => (fn(x), x));
const tap2 = fn => x => (fn(x), x);

const tee = arg => {
  console.log(arg);
  return arg;
};
const tee2 = (arg, logger = console.log) => {
  logger(arg);
  return args;
};
const tee3 = tap(console.log);

class City {
  constructor(name, lat, long) {
    this.name = name;
    this.lat = lat;
    this.long = long;
  }

  getName() {
    return this.name;
  }

  setName(newName) {
    this.name = newName;
  }

  setLat(newLat) {
    this.lat = newLat;
  }

  setLong(newLong) {
    this.long = newLong;
  }

  getCoords() {
    return [this.lat, this.long];
  }
}
let myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
console.log(myCity.getCoords(), myCity.getName());
// [ -34.9011, -56.1645 ] 'Montevideo, Uruguay'

const getHandler = {
  get(target, property, receiver) {
    if (typeof target[property] === "function") {
      // requesting a method? return a wrapped version
      return (...args) => {
        const result = target[property](...args);
        return result === undefined ? receiver : result;
      };
    } else {
      // an attribute was requested - just return it
      return target[property];
    }
  },
};

const chainify = obj => new Proxy(obj, getHandler);

myCity = chainify(myCity);

console.log(
  myCity
    .setName("Pune, India")
    .setLat(18.5626)
    .setLong(73.8087)
    .getCoords(),
  myCity.getName()
);
// [ 18.5626, 73.8087 ] 'Pune, India'

const binaryOp = op => new Function("x", "y", `return x ${op} y;`);
const binaryLeftOp = (x, op) => y => binaryOp2(op)(x, y);
const binaryOpRight = (op, y) => x => binaryOp2(op)(x, y);
const unaryOp = op => new Function("x", `return ${op}(x);`);

const getBalance = curry(getField)("balance");
const isNegative = x => x < 0;
const isNegativeBalance = v => v.balance < 0;
const isNegativeBalance2 = pipeline(getBalance, isNegative);
const isNegative2 = curry(binaryOp(">"))(0);
const isNegative3 = binaryOpRight("<", 0);
const isNegativeBalance3 = pipeline(
  curry(getField)("balance"),
  curry(binaryOp(">"))(0)
);
const isNegativeBalance4 = pipeline(
  curry(getField)("balance"),
  binaryOpRight("<", 0)
);

const composeTwo = (f, g) => (...args) => f(g(...args));
const composeTwoByFlipping = flipTwo(pipeTwo);
const compose = (...fns) => pipeline(...fns.reverse());
const compose2 = (...fns) => fns.reduceRight(pipeTwo);
const compose2b = (...fns) =>
  fns.reduceRight((f, g) => (...args) => g(f(...args)));
const compose3 = (...fns) => fns.reduce(composeTwo);

const not = fn => (...args) => !fn(...args);
const positiveBalance = not(isNegativeBalance);
const logicalNot = unaryOp("!");
const positiveBalance2 = compose(
  logicalNot,
  isNegativeBalance
);
const changeSign = unaryOp("-");

var palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];
const spanishComparison = (a, b) => a.localeCompare(b, "es");
palabras.sort(spanishComparison);
palabras.sort(
  compose(
    changeSign,
    spanishComparison
  )
);
console.log(palabras);

/* Node only
const countOdtFiles2b = path => compose(count, filterOdt, getDir)(path);
countOdtFiles2b("/home/fkereki/Documents"); // 4, no change here
compose(count, filterOdt, getDir)("/home/fkereki/Documents");
*/

const removeNonAlpha = str => str.replace(/[^a-z]/gi, " ");
const toUpperCase = demethodize(String.prototype.toUpperCase);
const splitInWords = str => str.trim().split(/\s+/);
const arrayToSet = arr => new Set(arr);
const setToList = set => Array.from(set).sort();

const GETTYSBURG_1_2 = `Four score and seven years ago
our fathers brought forth on this continent, a new nation,
conceived in liberty, and dedicated to the proposition
that all men are created equal. Now we are engaged in a
great civil war, testing whether that nation, or any
nation so conceived and so dedicated, can long
endure.`;

const getUniqueWords = compose(
  setToList,
  arrayToSet,
  splitInWords,
  toUpperCase,
  removeNonAlpha
);
const getUniqueWords1 = str => {
  const str1 = removeNonAlpha(str);
  const str2 = toUpperCase(str1);
  const arr1 = splitInWords(str2);
  const set1 = arrayToSet(arr1);
  const arr2 = setToList(set1);
  return arr2;
};
const getUniqueWords2 = str =>
  setToList(arrayToSet(splitInWords(toUpperCase(removeNonAlpha(str)))));
const getUniqueWords3 = composeTwo(
  setToList,
  composeTwo(
    arrayToSet,
    composeTwo(splitInWords, composeTwo(toUpperCase, removeNonAlpha))
  )
);

const testOdd = x => x % 2 === 1;
const testUnderFifty = x => x < 50;
const duplicate = x => x + x;
const addThree = x => x + 3;

const myArray = [22, 09, 60, 24, 11, 63];

const a0 = myArray
  .filter(testOdd)
  .map(duplicate)
  .filter(testUnderFifty)
  .map(addThree);
console.log(a0);
/*
[ 21, 25 ]
*/

/*
    Higher order functions, as in Chapter 6

    Make a makeReducer function: see Chapter 5,
    sections "Emulating map() with reduce()"
    and "Emulating filter() with reduce()"
*/

const mapTR = fn => reducer => (accum, value) => reducer(accum, fn(value));

const filterTR = fn => reducer => (accum, value) =>
  fn(value) ? reducer(accum, value) : accum;

/*
    A few filtering and mapping makeReducers
*/
const testOddR = filterTR(testOdd);
const testUnderFiftyR = filterTR(testUnderFifty);
const duplicateR = mapTR(duplicate);
const addThreeR = mapTR(addThree);

/*
    Tests
*/

const addToArray = (a, v) => {
  a.push(v);
  return a;
};

const a1 = myArray.reduce(
  testOddR(duplicateR(testUnderFiftyR(addThreeR(addToArray)))),
  []
);
console.log(a1);
/*
[ 21, 25 ]
*/

/*
    Using compose from earlier this chapter
*/
const compose = (...fns) =>
  fns.reduceRight((f, g) => (...args) => g(f(...args)));

const makeReducer1 = (arr, fns) =>
  arr.reduce(compose(...fns)(addToArray), []);

const a2 = makeReducer1(myArray, [
  testOddR,
  duplicateR,
  testUnderFiftyR,
  addThreeR,
]);
console.log(a2);
/*
[ 21, 25 ]
*/

/*
    More generic
*/
const makeReducer2 = (arr, fns, reducer = addToArray, initial = []) =>
  arr.reduce(compose(...fns)(reducer), initial);

const a3 = makeReducer2(myArray, [
  testOddR,
  duplicateR,
  testUnderFiftyR,
  addThreeR,
]);
console.log(a2);
/*
[ 21, 25 ]
*/

const sum = makeReducer2(
  myArray,
  [testOddR, duplicateR, testUnderFiftyR, addThreeR],
  (acc, value) => acc + value,
  0
);
console.log(sum);
/*
46
*/

// TEST

var fn1, fn2, fn3, fn4;

describe("pipeTwo", function() {
  beforeEach(() => {
    fn1 = () => {};
    fn2 = () => {};
  });

  it("works with single arguments", () => {
    spyOn(window, "fn1").and.returnValue(1);
    spyOn(window, "fn2").and.returnValue(2);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(22);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(22);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(result).toBe(2);
  });

  it("works with multiple arguments", () => {
    spyOn(window, "fn1").and.returnValue(11);
    spyOn(window, "fn2").and.returnValue(22);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(
      12,
      4,
      56
    );

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(12, 4, 56);
    expect(fn2).toHaveBeenCalledWith(11);
    expect(result).toBe(22);
  });
});

describe("pipeline", function() {
  beforeEach(() => {
    fn1 = () => {};
    fn2 = () => {};
    fn3 = () => {};
    fn4 = () => {};
  });

  it("works with a single function", () => {
    spyOn(window, "fn1").and.returnValue(11);

    const pipe = pipeline(fn1);
    const result = pipe(60);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(60);
    expect(result).toBe(11);
  });

  // we omit here tests for 2 functions,
  // which are similar to those for pipeTwo()

  it("works with 4 functions, multiple arguments", () => {
    spyOn(window, "fn1").and.returnValue(111);
    spyOn(window, "fn2").and.returnValue(222);
    spyOn(window, "fn3").and.returnValue(333);
    spyOn(window, "fn4").and.returnValue(444);

    const pipe = pipeline(fn1, fn2, fn3, fn4);
    const result = pipe(
      24,
      11,
      63
    );

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
    expect(fn4).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(24, 11, 63);
    expect(fn2).toHaveBeenCalledWith(111);
    expect(fn3).toHaveBeenCalledWith(222);
    expect(fn4).toHaveBeenCalledWith(333);
    expect(result).toBe(444);
  });
});

describe("compose", function() {
  beforeEach(() => {
    fn1 = () => {};
    fn2 = () => {};
    fn3 = () => {};
    fn4 = () => {};
  });

  // other tests omitted...

  it("works with 4 functions, multiple arguments", () => {
    spyOn(window, "fn1").and.returnValue(111);
    spyOn(window, "fn2").and.returnValue(222);
    spyOn(window, "fn3").and.returnValue(333);
    spyOn(window, "fn4").and.returnValue(444);

    const pipe = compose(
      fn4,
      fn3,
      fn2,
      fn1
    );
    const result = pipe(
      24,
      11,
      63
    );

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
    expect(fn4).toHaveBeenCalledTimes(1);

    expect(fn1).toHaveBeenCalledWith(24, 11, 63);
    expect(fn2).toHaveBeenCalledWith(111);
    expect(fn3).toHaveBeenCalledWith(222);
    expect(fn4).toHaveBeenCalledWith(333);
    expect(result).toBe(444);
  });
});

var myCity;

describe("chainify", function() {
  beforeEach(() => {
    myCity = new City("Montevideo, Uruguay", -34.9011, -56.1645);
    myCity = chainify(myCity);
  });

  it("doesn't affect get functions", () => {
    expect(myCity.getName()).toBe("Montevideo, Uruguay");
    expect(myCity.getCoords()[0]).toBe(-34.9011);
    expect(myCity.getCoords()[1]).toBe(-56.1645);
  });

  it("doesn't affect getting attributes", () => {
    expect(myCity.name).toBe("Montevideo, Uruguay");
    expect(myCity.lat).toBe(-34.9011);
    expect(myCity.long).toBe(-56.1645);
  });

  it("returns itself from setting functions", () => {
    expect(myCity.setName("Other name")).toBe(myCity);
    expect(myCity.setLat(11)).toBe(myCity);
    expect(myCity.setLong(22)).toBe(myCity);
  });

  it("allows chaining", () => {
    const newCoords = myCity
      .setName("Pune, India")
      .setLat(18.5626)
      .setLong(73.8087)
      .getCoords();

    expect(myCity.name).toBe("Pune, India");
    expect(newCoords[0]).toBe(18.5626);
    expect(newCoords[1]).toBe(73.8087);
  });
});
