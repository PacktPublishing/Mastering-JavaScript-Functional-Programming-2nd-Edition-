function newCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const shorterCounter = () => {
  let count = 0;
  return () => ++count;
};

const counter1 = shorterCounter();
console.log(counter1());
console.log(counter1());
console.log(counter1());
console.log(counter1());
/*
1
2
3
4
*/
