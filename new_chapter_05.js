const myArray = [22, 9, 60, 12, 4, 56];
const sum = (x, y) => x + y;
const mySum = myArray.reduce(sum, 0);
console.log(mySum);
/*
    163
*/

const sumAndLog = (x, y) => {
  console.log(`${x}+${y}=${x + y}`);
  return x + y;
};
myArray.reduce(sumAndLog, 0);
/*
    0+22=22
    22+9=31
    31+60=91
    91+12=103
    103+4=107
    107+56=163
*/

const average = arr => arr.reduce(sum, 0) / arr.length;
console.log(average(myArray));
/*
    27.166667
*/

const average2 = (sum, val, ind, arr) => {
  sum += val;
  return ind == arr.length - 1 ? sum / arr.length : sum;
};
console.log(myArray.reduce(average2, 0));
/*
    27.166667
*/

Array.prototype.average = function() {
  return this.reduce((x, y) => x + y, 0) / this.length;
};
let myAvg = [22, 9, 60, 12, 4, 56].average();
console.log(myAvg);
/*
    27.166667
*/

const average3 = arr => {
  const sc = arr.reduce(
    (ac, val) => ({sum: val + ac.sum, count: ac.count + 1}),
    {sum: 0, count: 0}
  );
  return sc.sum / sc.count;
};
console.log(average3(myArray));
/*
    27.166667
*/

const average4 = arr => {
  const sc = arr.reduce((ac, val) => [ac[0] + val, ac[1] + 1], [0, 0]);
  return sc[0] / sc[1];
};
console.log(average4(myArray));
/*
    27.166667
*/

const reverseString = str => {
  let arr = str.split("");
  arr.reverse();
  return arr.join("");
};
console.log(reverseString("MONTEVIDEO"));
/*
    OEDIVETNOM
*/

const reverseString2 = str =>
  str.split("").reduceRight((x, y) => x + y, "");
console.log(reverseString2("OEDIVETNOM"));
/*
    MONTEVIDEO
*/

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

let averageLat = average(markers.map(x => x.lat));
let averageLon = average(markers.map(x => x.lon));
console.log(averageLat, averageLon);
/*
    -15.76 -65.53
*/

let averageLat2 = markers.map(x => x.lat).average();
let averageLon2 = markers.map(x => x.lon).average();
console.log(averageLat2, averageLon2);

console.log(["123.45", "67.8", "90"].map(parseFloat));
/*
    [123.45, 67.8, 90]
*/

console.log(["123.45", "-67.8", "90"].map(parseInt));
/*
    [123, NaN, NaN]
*/

console.log(["123.45", "-67.8", "90"].map(x => parseFloat(x)));
/*
    [123.45, -67.8, 90]
*/

console.log(["123.45", "-67.8", "90"].map(x => parseInt(x)));
/*
    [123, -67, 90]
*/

const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);
let from2To6 = range(2, 7);
console.log(from2To6);
/*
    [2, 3, 4, 5, 6];
*/

const factorialByRange = n => range(1, n + 1).reduce((x, y) => x * y, 1);
console.log(factorialByRange(5)); // 120
console.log(factorialByRange(3)); // 6

const ALPHABET = range("A".charCodeAt(), "Z".charCodeAt() + 1).map(x =>
  String.fromCharCode(x)
);
// ["A", "B", "C", ... "X", "Y", "Z"]
console.log(ALPHABET);

const myMap = (arr, fn) => arr.reduce((x, y) => x.concat(fn(y)), []);
const dup = x => 2 * x;
console.log(myArray.map(dup));
/*
    [44, 18, 120, 24, 8, 112]
*/
console.log(myMap(myArray, dup));
/*
    [44, 18, 120, 24, 8, 112]
*/
console.log(myArray);
/*
    [22, 9, 60, 12, 4, 56]
*/

const a = [[1, 2], [3, 4, [5, 6, 7]], 8, [[[9]]]];

console.log(a.flat()); // or a.flat(1)
/*
  [ 1, 2, 3, 4, [ 5, 6, 7 ], 8, [ 9, 10 ] ]
*/

console.log(a.flat(2));
/*
  [ 1, 2, 3, 4, 5, 6, 7, 8, [ 9, 10 ] ]
*/

console.log(a.flat(Infinity));
/*
  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
*/

const distances = [
  [0, 20, 35, 40],
  [20, 0, 10, 50],
  [35, 10, 0, 30],
  [40, 50, 30, 0],
];

const maxDist1 = Math.max(...distances.flat()); // 50
const maxDist2 = distances.flat().reduce((p, d) => Math.max(p, d), 0); // also 50

console.log(maxDist1, maxDist2);
/*
  50 50
*/

const apiAnswer = [
  {
    country: "AR",
    name: "Argentine",
    states: [
      {
        state: "1",
        name: "Buenos Aires",
        cities: [{city: 3846864, name: "Lincoln"}],
      },
    ],
  },
  {
    country: "GB",
    name: "Great Britain",
    states: [
      {
        state: "ENG",
        name: "England",
        cities: [{city: 2644487, name: "Lincoln"}],
      },
    ],
  },
  {
    country: "US",
    name: "United States of America",
    states: [
      {
        state: "CA",
        name: "California",
        cities: [{city: 5072006, name: "Lincoln"}],
      },
      {
        state: "RI",
        name: "Rhode Island",
        cities: [{city: 8531960, name: "Lincoln"}],
      },
      {
        state: "VA",
        name: "Virginia",
        cities: [{city: 4769608, name: "Lincolnia"}],
      },
      {
        state: "MI",
        name: "Michigan",
        cities: [{city: 4999311, name: "Lincoln Park"}],
      },
      {
        state: "NE",
        name: "Nebraska",
        cities: [{city: 5072006, name: "Lincoln"}],
      },
      {
        state: "IL",
        name: "Illinois",
        cities: [
          {city: 4899911, name: "Lincoln Park"},
          {city: 4899966, name: "Lincoln Square"},
        ],
      },
    ],
  },
];

// if we just want the cities
console.log(
  apiAnswer
    .map(x => x.states)
    .flat()
    .map(y => y.cities)
    .flat()
);
/*
[ { city: 3846864, name: 'Lincoln' },
  { city: 2644487, name: 'Lincoln' },
  { city: 5072006, name: 'Lincoln' },
  { city: 8531960, name: 'Lincoln' },
  { city: 4769608, name: 'Lincolnia' },
  { city: 4999311, name: 'Lincoln Park' },
  { city: 5072006, name: 'Lincoln' },
  { city: 4899911, name: 'Lincoln Park' },
  { city: 4899966, name: 'Lincoln Square' } ]
*/

console.log(apiAnswer.flatMap(x => x.states).flatMap(y => y.cities));
/*
  same output
*/

const names = [
  "Winston Spencer Churchill",
  "Plato",
  "Abraham Lincoln",
  "Socrates",
  "Charles Darwin",
];

const lastNames = names.flatMap(x => {
  const s = x.split(" ");
  return s.length === 1 ? [] : s.splice(1);
});
console.log(lastNames);
/*
  [ 'Spencer', 'Churchill', 'Lincoln', 'Darwin' ]
*/

const gettysburg = [
  "Four score and seven years ago our fathers brought forth, ",
  "on this continent, a new nation, conceived in liberty, and ",
  "dedicated to the proposition that all men are created equal.",
  "Now we are engaged in a great civil war, testing whether that ",
  "nation, or any nation so conceived and so dedicated, can long ",
  "endure.",
  "We are met on a great battle field of that war.",
  "We have come to dedicate a portion of that field, as a final ",
  "resting place for those who here gave their lives, that that ",
  "nation might live.",
  "It is altogether fitting and proper that we should do this.",
  "But, in a larger sense, we cannot dedicate, we cannot consecrate, ",
  "we cannot hallow, this ground.",
  "The brave men, living and dead, who struggled here, have ",
  "consecrated it far above our poor power to add or detract.",
  "The world will little note nor long remember what we say here, ",
  "but it can never forget what they did here.",
  "It is for us the living, rather, to be dedicated here to the ",
  "unfinished work which they who fought here have thus far so nobly ",
  "advanced.",
  "It is rather for us to be here dedicated to the great task ",
  "remaining before us— that from these honored dead we take increased ",
  "devotion to that cause for which they here gave the last full ",
  "measure of devotion— that we here highly resolve that these dead ",
  "shall not have died in vain— that this nation, under God, shall have ",
  "a new birth of freedom- and that government of the people, by the ",
  "people, for the people, shall not perish from the earth.",
];
console.log(gettysburg.flatMap(s => s.split(" ")).length); // 270 ...not 272?

const flatAll = arr =>
  arr.reduce((f, v) => f.concat(Array.isArray(v) ? flatAll(v) : v), []);

const flatOne1 = arr => [].concat(...arr);
const flatOne2 = arr => arr.reduce((f, v) => f.concat(v), []);
const flatOne = flatOne2;

/*
const range = (start, stop) =>
  new Array(stop - start).fill(0).map((v, i) => start + i);
*/

const flat1 = (arr, n = 1) => {
  if (n === Infinity) {
    return flatAll(arr);
  } else {
    let result = arr;
    range(0, n).forEach(() => {
      result = flatOne(result);
    });
    return result;
  }
};

const flat2 = (arr, n = 1) =>
  n === Infinity
    ? flatAll(arr)
    : n === 1
    ? flatOne(arr)
    : flat2(flatOne(arr), n - 1);

const flat = flat1;

if (!Array.prototype.flat) {
  Array.prototype.flat = function(n = 1) {
    this.flatAllX = () =>
      this.reduce(
        (f, v) => f.concat(Array.isArray(v) ? v.flat(Infinity) : v),
        []
      );

    this.flatOneX = () => this.reduce((f, v) => f.concat(v), []);

    return n === Infinity
      ? this.flatAllX()
      : n === 1
      ? this.flatOneX()
      : this.flatOneX().flat(n - 1);
  };
}

const objCopy = obj => {
  let copy = Object.create(Object.getPrototypeOf(obj));
  Object.getOwnPropertyNames(obj).forEach(prop =>
    Object.defineProperty(
      copy,
      prop,
      Object.getOwnPropertyDescriptor(obj, prop)
    )
  );
  return copy;
};
const myObj = {fk: 22, st: 12, desc: "couple"};
const myCopy = objCopy(myObj);
console.log(myObj, myCopy);
/*
    {fk: 22, st: 12, desc: "couple"}, twice
*/

const factorial4 = n => {
  let result = 1;
  range(1, n + 1).forEach(v => (result *= v));
  return result;
};
console.log(factorial4(5));
/*
    120
*/

const serviceResult = {
  accountsData: [
    {
      id: "F220960K",
      balance: 1024,
    },
    {
      id: "S120456T",
      balance: 2260,
    },
    {
      id: "J140793A",
      balance: -38,
    },
    {
      id: "M120396V",
      balance: -114,
    },
    {
      id: "A120289L",
      balance: 55000,
    },
  ],
};
const delinquent = serviceResult.accountsData.filter(v => v.balance < 0);
console.log(delinquent);
/*
    two objects, with id's J140793A and M120396V
*/

const delinquentIds = delinquent.map(v => v.id);
console.log(delinquentIds);
/*
    J140793A M120396V
*/

const delinquentIds2 = serviceResult.accountsData
  .filter(v => v.balance < 0)
  .map(v => v.id);
console.log(delinquentIds2);
/*
    J140793A M120396V
*/

const myFilter = (arr, fn) =>
  arr.reduce((x, y) => (fn(y) ? x.concat(y) : x), []);

console.log(myFilter(serviceResult.accountsData, v => v.balance < 0));
// two objects, with id's J140793A and M120396V

let brazilData = markers.find(v => v.name === "BR");
console.log(brazilData);
/*
    {name:"BR", lat:-15.8, lon:-47.9}
*/

let brazilIndex = markers.findIndex(v => v.name === "BR");
console.log(brazilIndex);
/*
    2
*/
let mexicoIndex = markers.findIndex(v => v.name === "MX");
console.log(mexicoIndex);
/*
    -1
*/

console.log(markers.every(v => v.lat < 0 && v.lon < 0));
/*
    false
*/
console.log(markers.some(v => v.lat < 0 && v.lon < 0));
/*
    true
*/

const none = (arr, fn) => arr.every(v => !fn(v));
Array.prototype.none = function(fn) {
  return this.every(v => !fn(v));
};

const fakeAPI = (delay, value) =>
  new Promise(resolve => setTimeout(() => resolve(value), delay));

const useResult = x => console.log(new Date(), x);

(async () => {
  console.log("START");
  console.log(new Date());
  const result = await fakeAPI(1000, 229);
  useResult(result);
  console.log("END");
})();
/*
START
2019-10-13T19:11:56.209Z
2019-10-13T19:11:57.214Z 229
END
*/

(async () => {
  console.log("START SEQUENCE");

  const x1 = await fakeAPI(1000, 1);
  useResult(x1);
  const x2 = await fakeAPI(2000, 2);
  useResult(x2);
  const x3 = await fakeAPI(3000, 3);
  useResult(x3);
  const x4 = await fakeAPI(4000, 4);
  useResult(x4);

  console.log("END SEQUENCE");
})();
/*
START SEQUENCE
2019-10-12T13:38:42.367Z 1
2019-10-12T13:38:43.375Z 2
2019-10-12T13:38:44.878Z 3
2019-10-12T13:38:46.880Z 4
END SEQUENCE
*/

(() => {
  console.log("START FOREACH");

  [1, 2, 3, 4].forEach(async n => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });

  console.log("END FOREACH");
})();
/*
START FOREACH
END FOREACH
2019-10-12T13:34:57.876Z 1
2019-10-12T13:34:58.383Z 2
2019-10-12T13:34:58.874Z 3
2019-10-12T13:34:59.374Z 4
*/

const forEachAsync = (arr, fn) =>
  arr.reduce(
    (promise, value) => promise.then(() => fn(value)),
    Promise.resolve()
  );

(async () => {
  console.log("START FOREACH VIA REDUCE");
  await forEachAsync([1, 2, 3, 4], async n => {
    const x = await fakeAPI(n * 1000, n);
    useResult(x);
  });
  console.log("END FOREACH VIA REDUCE");
})();
/*
START FOREACH VIA REDUCE
2019-10-13T20:02:23.437Z 1
2019-10-13T20:02:24.446Z 2
2019-10-13T20:02:25.949Z 3
2019-10-13T20:02:27.952Z 4
END FOREACH VIA REDUCE
*/

const mapAsync = (arr, fn) => Promise.all(arr.map(fn));

(async () => {
  console.log("START MAP");

  const mapped = await mapAsync([1, 2, 3, 4], async n => {
    const x = await fakeAPI(n * 1000, n);
    return x;
  });

  useResult(mapped);
  console.log("END MAP");
})();
/*
START MAP
2019-10-13T20:06:21.149Z [ 1, 2, 3, 4 ]
END MAP
*/

const filterAsync = (arr, fn) =>
  mapAsync(arr, fn).then(arr2 => arr.filter((v, i) => Boolean(arr2[i])));

const fakeFilter = value =>
  new Promise(resolve => setTimeout(() => resolve(value % 2 === 0), 1000));

(async () => {
  console.log("START FILTER");

  const filtered = await filterAsync([1, 2, 3, 4], async n => {
    const x = await fakeFilter(n);
    return x;
  });

  useResult(filtered);
  console.log("END FILTER");
})();
/*
START FILTER
2019-10-13T21:24:36.478Z [ 2, 4 ]
END FILTER
*/

const reduceAsync = (arr, fn, init) =>
  Promise.resolve(init).then(accum =>
    forEachAsync(arr, async (v, i) => {
      accum = await fn(accum, v, i);
    }).then(() => accum)
  );

const fakeSum = (value1, value2) =>
  new Promise(resolve => setTimeout(() => resolve(value1 + value2), 1000));

(async () => {
  console.log("START REDUCE");

  const summed = await reduceAsync(
    [1, 2, 3, 4],
    async (_accum, n) => {
      const accum = await _accum;
      const x = await fakeSum(accum, n);
      useResult(`accumulator=${accum} value=${x} `);
      return x;
    },
    0
  );

  useResult(summed);
  console.log("END REDUCE");
})();
/*
START REDUCE
2019-10-13T21:29:01.841Z 'accumulator=0 value=1 '
2019-10-13T21:29:02.846Z 'accumulator=1 value=3 '
2019-10-13T21:29:03.847Z 'accumulator=3 value=6 '
2019-10-13T21:29:04.849Z 'accumulator=6 value=10 '
2019-10-13T21:29:04.849Z 10
END REDUCE
*/
