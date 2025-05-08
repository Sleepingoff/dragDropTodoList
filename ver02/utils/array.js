//filter array -> filter array with value
export function filterArray(array, key, value) {
  //filter array
  //!updateArray와 달리 value를 받기 때문에 인자 전달이 좀 헷갈릴 듯하여 교체
  const newArray = array.filter((item) => item[key] === value[key]);
  //return new array
  return newArray;
}

//filter array -> filter array without value
export function filterArrayWithoutValue(array, key, value) {
  const newArray = array.filter((item) => item[key] != value[key]);
  return newArray;
}

//update array
export function updateArray(array, key, value) {
  //map array
  const newArray = array.map((item) => {
    if (item[key] === value[key]) {
      return { ...item, ...value };
    }
    return item;
  });
  //return new array
  return newArray;
}

//나중에 순서를 바꾸는 등의 작업을 할 수 있도록 별도로 분리
//add array
export function addArray(array, value) {
  const newArray = [...array];
  //push value to array
  newArray.push(value);
  //return new array
  return newArray;
}

//switch order of array by index
export function switchArray(array, index1, index2) {
  const newArray = [...array];
  //switch order of array by index
  const temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;
  //return new array
  return newArray;
}

//sort array by key
export function sortArray(array, key) {
  const newArray = [...array];
  //sort array by key
  newArray.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  //return new array
  return newArray;
}
