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
