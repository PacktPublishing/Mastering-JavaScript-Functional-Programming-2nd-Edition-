const partition = (arr, fn) =>
  arr.reduce(
    (result, elem) => {
      result[fn(elem) ? 0 : 1].push(elem);
      return result;
    },
    [[], []]
  );

const arr = [22, 9, 60, 12, 4, 56];

const [low, high] = partition(arr, x => x < 22);
console.log(low, high);
